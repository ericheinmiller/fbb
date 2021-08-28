import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Login from './login.jsx';
import Home from './home.jsx';

export default () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('user'));

    if (userInfo) {
      axios.post('http://localhost:8080/api/isLoggedIn', userInfo)
        .then((response) => {
          setLoggedIn(response.data);
        });
    }
  }, []);

  return loggedIn === false ? <Login setLoggedIn={setLoggedIn}/> : <Home setLoggedIn={setLoggedIn}/>;
};
