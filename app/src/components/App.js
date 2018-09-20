import React from 'react';
import axios from 'axios';
import { store } from './../store';

import DispatchList from './dispatchList';
import Routes from './../routes';

class App extends React.Component {
  render = () => {
    return (
      <div>
        <Routes />
      </div>
    )
  }
}

export default App;
