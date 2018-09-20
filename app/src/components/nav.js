import React from "react";
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'

import './nav.scss';

class Nav extends React.Component {

  render = () => {
    return (
      <nav className="nav">
        <ul>
          <li className="nav__item">
            <NavLink to="/addbox" activeClassName="selected">REGISTER BOX</NavLink>
          </li>
          <li className="nav__item">
            <NavLink to="/listboxes" activeClassName="selected">DISPATCH LIST</NavLink>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Nav;
