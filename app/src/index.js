import React from 'react';
import ReactDOM from 'react-dom';

import AddBox from './components/addBox';

import './style.scss';

ReactDOM.render((
  <div className="site-container">
    <AddBox />
  </div>
), document.getElementById('root'));
