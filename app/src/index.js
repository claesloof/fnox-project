import React from 'react';
import ReactDOM from 'react-dom';

import AddBox from './components/addBox';

import './style.scss';

ReactDOM.render((
  <div className="site-container">
    <h1>Boxinator</h1>
    <AddBox />
  </div>
), document.getElementById('root'));
