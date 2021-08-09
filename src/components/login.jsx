import React, { useState } from 'react';
import axios from 'axios';

export default (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');

  const handleMouseDown = () => {
    const postInfo = {
      email,
      password,
    };
    if (repassword && repassword === password) {
      axios.post('http://localhost:8080/api/register', postInfo)
      // register
        .then((response) => {
          if (response.data === true) {
            localStorage.setItem('user', JSON.stringify(postInfo));
            props.setLoggedIn(response.data);
          }
        });
    } else {
      // login
      axios.post('http://localhost:8080/api/login', postInfo)
        .then((response) => {
          if (response.data === true) {
            localStorage.setItem('user', JSON.stringify(postInfo));
            props.setLoggedIn(response.data);
          }
        });
    }
  };

  return (
    <div className="login">
      <h3>
        Welcome. Just get it off of your chest.
      </h3>
      <p className="text">
        Email
      </p>
      <input value={email} onChange={({ target }) => { setEmail(target.value); }} />
      <p className="text">
        Password
      </p>
      <input value={password} type="password" onChange={({ target }) => { setPassword(target.value); }} />
      <p className="text">
        Enter password again
      </p>
      <input value={repassword} type="password" onChange={({ target }) => { setRepassword(target.value); }} />
      <button onMouseDown={() => { handleMouseDown(); }} type="button">
        Login or Register
      </button>
    </div>
  );
};
