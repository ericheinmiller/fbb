import React from 'react';
import ReactDOM from 'react-dom';
/// import { createStore, applyMiddleware } from 'redux';
/// import { Provider } from 'react-redux';
// import Reducers from './reducers/index';

import App from './components/app.jsx';
import './index.scss';

// const store = createStore(Reducers, applyMiddleware());

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
