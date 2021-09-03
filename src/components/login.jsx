import React, { useState } from 'react';
import axios from 'axios';
import validator from 'email-validator';
import Error from './error.jsx';

export default (props) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(null);
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerPasswordError, setRegisterPasswordError] = useState(null);
  const [register, setRegister] = useState(false);

  const handleMouseDown = () => {
    if (emailError || passwordError || registerPasswordError) {
      return;
    }

    if (email === '') {
      setEmailError('Email cannot be blank.');
      return;
    }

    if (password === '') {
      setPasswordError('Password cannot be blank.');
      return;
    }

    if (password !== registerPassword && register) {
      setRegisterPasswordError('Passwords do not match.');
      return;
    }

    const postInfo = {
      email,
      password,
    };

    axios.post(`http://localhost:8080/api/${register ? 'register' : 'login'}`, postInfo)
      .then((response) => {
        const userData = {
          id: response.data.rows[0].id,
          email,
          date: Date.now(),
        };
        if (response.status === 200) {
          localStorage.setItem('user', JSON.stringify(userData));
          props.setLoggedIn(true);
        } else {
          setPasswordError('Email or password incorrect');
        }
      });
  };

  const handleEmailChange = (target) => {
    setEmail(target.value);
    if (target.value === '' || validator.validate(target.value)) {
      setEmailError(null);
    } else {
      setEmailError('Not a valid email address');
    }
  };

  const handlePasswordChange = (target) => {
    setPassword(target.value);
    setPasswordError(null);
  };

  const handleRegister = (target) => {
    setRegisterPassword(target.value);
    if (password !== target.value) {
      setRegisterPasswordError('Passwords do not match.');
    } else {
      setRegisterPasswordError(null);
    }
  };

  const input = (placeholder, value, error, callback, visible, password) => (
    <div className="login-input-container">
      <input placeholder={placeholder} value={value} className={`login-input ${error ? 'login-input--error' : null} ${visible ? null : 'hide'}`} onChange={({ target }) => { callback(target); }} type={password ? 'password' : null} />
      { error ? <Error message={error} /> : null }
    </div>
  );

  return (
    <div className="login">
      <h3 className="login__title">
        Welcome. Just say it.
      </h3>
      { input('Email Address', email, emailError, handleEmailChange, true, false) }
      { input('Password', password, passwordError, handlePasswordChange, true, true) }
      { input('Type Password Again', registerPassword, registerPasswordError, handleRegister, register, true) }
      <div className="login-container">
        <button className="login-button" onMouseDown={() => { handleMouseDown(); }} type="button">
          { register ? 'Register' : 'Login' }
        </button>
        <button className={`register-button ${register ? 'hide' : null}`} onMouseDown={() => { setRegister(true); }} type="button">
          Register
        </button>
      </div>
    </div>
  );
};
