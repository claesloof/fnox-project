import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';

import App from './components/app';

import './style.scss';

ReactDOM.render((
  <Provider store={store}>
    <div className="site-container">
      <h1>Boxinator</h1>
      <App />
    </div>
  </Provider>
), document.getElementById('root'));
