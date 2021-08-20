import React, { useState } from 'react';
import axios from 'axios';
import validator from 'email-validator';
import Error from './error.jsx';

export default (props) => {
  const [email, setEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [password, setPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [rePassword, setRepassword] = useState('');
  const [rePasswordStatus, setRepasswordStatus] = useState(null);
  const [rePasswordError, setRepasswordError] = useState(null);
  const [register, setRegister] = useState(false);

  const handleMouseDown = () => {
    if (emailError || passwordError || rePasswordError) {
      return;
    }
    const postInfo = {
      email,
      password,
    };

    if (email === '') {
      setEmailStatus('login-input--error');
      setEmailError('Email cannot be blank.');
      return;
    }

    if (password === '') {
      setPasswordStatus('login-input--error');
      setPasswordError('Password cannot be blank.');
      return;
    }

    axios.post(`http://localhost:8080/api/${register ? 'register' : 'login'}`, postInfo)
      .then((response) => {
        if (response.data === true) {
          localStorage.setItem('user', JSON.stringify(postInfo));
          props.setLoggedIn(response.data);
        } else {
          setEmailStatus('login-input--error');
          setPasswordStatus('login-input--error');
          setPasswordError('Email or password incorrect');
        }
      });
  };

  const handleEmailChange = (target) => {
    setEmail(target.value);
    if (target.value === '' || validator.validate(target.value)) {
      setEmailStatus(null);
      setEmailError(null);
    } else {
      setEmailStatus('login-input--error');
      setEmailError('Not a valid email address');
    }
  };

  const handlePasswordChange = (target) => {
    setPassword(target.value);
    setPasswordError(null);
    setPasswordStatus(null);
  };

  const handleRegister = (target) => {
    setRepassword(target.value);
    if (password !== target.value) {
      setRepasswordError('Passwords do not match.');
      setRepasswordStatus('login-input--error');
    } else {
      setRepasswordStatus(null);
      setRepasswordError(null);
    }
  };

  return (
    <div className="login">
      <h3 className="login__title">
        Welcome. Just say it.
      </h3>
      <div className="login-input-container">
        <input placeholder="Email Address" value={email} className={`login-input ${emailStatus}`} onChange={({ target }) => { handleEmailChange(target); }} />
        { emailError ? <Error message={emailError} /> : null }
      </div>
      <div className="login-input-container">
        <input placeholder="Password" value={password} className={`login-input ${passwordStatus}`} type="password" onChange={({ target }) => { handlePasswordChange(target); }} />
        { passwordError ? <Error message={passwordError} /> : null }
      </div>
      <div className="login-input-container">
        <input className={`login-input ${register ? null : 'hide'} ${rePasswordStatus}`} placeholder="Type Password Again" value={rePassword} type="password" onChange={({ target }) => { handleRegister(target); }} />
        { rePasswordError ? <Error message={rePasswordError} /> : null }
      </div>
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
