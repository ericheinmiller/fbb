const express = require('express');
const pg = require('pg');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
const conString = 'postgres://mcsxdfjd:XKFXnxA0qs3NBT7CC2WdixznKGDpeEU7@baasu.db.elephantsql.com/mcsxdfjd';
const client = new pg.Client(conString);

client.connect((err) => {
  if (err) {
    console.error('Could not connect to postgres', err);
  }
});

app.use(express.static('dist'));

app.post('/api/isLoggedIn', (req, res) => {
  const { email, password } = req.body;
  const query = `select email, password from users where email = '${email}' and password = '${password}'`;
  const login = new Promise((resolve, reject) => {
    client.query(query, (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
  login.then((message) => {
    if (message.rows.length) {
      res.send(true);
    } else {
      res.send(false);
    }
  });
});


app.post('/api/post', (req, res) => {
  const { content, userId } = req.body;
  const query = ``;
  const login = new Promise((resolve, reject) => {
    client.query(query, (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
  login.then((message) => {
    if (message.rows.length) {
      res.send(true);
    } else {
      res.send(false);
    }
  });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Logging in...');
  const query = `select email, password from users where email = '${email}' and password = '${password}'`;
  const login = new Promise((resolve, reject) => {
    client.query(query, (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
  login.then((message) => {
    console.log(message);
    if (message.rows.length) {
      res.send(true);
    } else {
      res.send(false);
    }
  });
});

app.post('/api/register', (req, res) => {
  console.log('Attempting to Register...');
  const { email, password } = req.body;
  const query = `insert into users (email, password) values ('${email}', '${password}')`;
  client.query(query)
    .then((response) => {
      console.log('Successfully Registered! ', response);
      res.send(true);
    }).catch((err) => {
      console.log('failure, error: ', err);
      res.send(false);
    });
});

app.post('/api/newPost', (req, res) => {
  console.log('Attempting to make a new post...', req.body);
  const { email, content, id } = req.body;
  const query = `insert into posts (content, userId) values ('${content}', ${id}) `;
  client.query(query)
    .then((response) => {
      console.log('Successfully posted! ', response);
      res.send(true);
    }).catch((err) => {
      console.log('failure, error: ', err);
      res.send(false);
    });
});

app.get('/api/getPosts', (req, res) => {
  console.log('Attempting to retrieve posts');
  const query = 'select posts.content, users.email from posts inner join users on posts.userid = users.id';
  client.query(query)
    .then((response) => {
      console.log('Successful query', response);
      res.send(response);
    }).catch((err) => {
      console.log('failure, error: ', err);
      res.send(false);
    });
});

app.listen(3000, () => console.log('The server is up and running'));
