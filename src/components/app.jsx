import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Login from './login.jsx';
import Home from './home.jsx';

export default () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      const postInfo = {
        email: user.email,
        password: user.password,
      };
      axios.post('http://localhost:8080/api/isLoggedIn', postInfo)
        .then((response) => {
          console.log(response);
          setLoggedIn(response.data);
        });
    }
  }, []);

  return loggedIn === false ? <Login setLoggedIn={setLoggedIn}/> : <Home setLoggedIn={setLoggedIn}/>;
};
