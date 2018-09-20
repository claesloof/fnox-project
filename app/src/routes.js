import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import DispatchList from './components/dispatchList';
import Nav from './components/nav';
import RegisterBox from './components/registerBox';

const Routes = () => (
  <div>
    <HashRouter>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={RegisterBox} />
          <Route path="/addbox" component={RegisterBox} />
          <Route path="/listboxes" component={DispatchList} />
        </Switch>
      </div>
    </HashRouter>
  </div>
)

export default Routes;
