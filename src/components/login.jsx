import React, { useState } from 'react';
import axios from 'axios';

export default (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [register, setRegister] = useState('hide');

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

  const handleRegister = (e) => {
    setRegister(null);
  };

  return (
    <div className="login">
      <h3>
        Welcome. Just get it off of your chest
      </h3>
      <input placeholder="Email Address" value={email} onChange={({ target }) => { setEmail(target.value); }} />
      <input placeholder="Password" value={password} type="password" onChange={({ target }) => { setPassword(target.value); }} />
      <input className={`register-input ${register}`} data-input="register" placeholder="Type Password Again" value={repassword} type="password" onChange={({ target }) => { setRepassword(target.value); }} />
      <div className="login-container">
        <button className="login-button" onMouseDown={() => { handleMouseDown(); }} type="button">
          { register ? 'Login' : 'Register' }
        </button>
        <button className={`register-button ${register ? null : 'hide'}`} onMouseDown={(e) => { handleRegister(e); }} type="button">
          Register
        </button>
      </div>
    </div>
  );
};
