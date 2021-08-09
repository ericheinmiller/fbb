const express = require('express');
const Pool = require('pg').Pool;
const os = require('os');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

const pool = new Pool({
  user: 'ericheinmiller',
  host: 'localhost',
  database: 'facebook',
  password: '',
  port: 5432,
});

app.use(express.static('dist'));

app.post('/api/isLoggedIn', (req, res) => {
  console.log('checking if logged in', res.body);
  const email = req.body.email;
  const password = req.body.password;
  const query = `select email, password from users where email = '${email}' and password = '${password}'`;
  const login = new Promise((resolve, reject) => {
    pool.query(query, (error, results) => {
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
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password);
  const query = `select email, password from users where email = '${email}' and password = '${password}'`;
  const login = new Promise((resolve, reject) => {
    pool.query(query, (error, results) => {
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

app.post('/api/register', (req, res) => {
  console.log('attempting to register');
  const email = req.body.email;
  const password = req.body.password;
  const query = `insert into users (email, password) values ('${email}', '${password}')`;
  pool.query(query)
    .then((response) => {
      console.log('success! Rerouting')
      res.send(true)
    }).catch((err) => {
      console.log('failure, error: ', err);
      res.send(false);
    });
});

app.listen(3000, () => console.log('The server is up and running'));
