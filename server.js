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
  const { id, date } = req.body;
  const timePeriod = Date.now() - date;
  if (timePeriod > 3600000) {
    res.send(false);
  }
  const query = `select email, password from users where id = '${id}'`;
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
  const query = `select id, email, password from users where email = '${email}' and password = '${password}'`;
  const login = new Promise((resolve, reject) => {
    client.query(query, (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
  login.then((message) => {
    console.log('Successfully logged in!');
    if (message.rows.length) {
      res.send(message);
    } else {
      res.send(false);
    }
  });
});

app.post('/api/register', (req, res) => {
  console.log('Attempting to Register...');
  const { email, password } = req.body;
  const query = `insert into users (email, password) values ('${email}', '${password}') returning id`;
  client.query(query)
    .then((response) => {
      console.log('Successfully Registered! ', response);
      res.send(response);
    }).catch((err) => {
      console.log('failure, error: ', err);
      res.send(false);
    });
});

app.post('/api/newPost', (req, res) => {
  console.log('Attempting to make a new post...', req.body);
  const { content, id } = req.body;
  const query = `insert into posts (content, userId) values ('${content}', ${id}) `;
  client.query(query)
    .then((response) => {
      console.log('Successfully posted!');
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
      console.log('Successful query');
      res.send(response);
    }).catch((err) => {
      console.log('failure, error: ', err);
      res.send(false);
    });
});

app.listen(3000, () => console.log('The server is up and running'));
