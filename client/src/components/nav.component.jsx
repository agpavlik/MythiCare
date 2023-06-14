import React, { Component } from "react";
import {Link} from "react-router-dom";


export default class Nav extends Component {

  handleLogout = () => {
    localStorage.clear();
    this.props.setUser(null);
  };

  render(){

    let navButtons;
    
    if(this.props.user){
      navButtons = (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to={'/'} onClick = {this.handleLogout}>Logout</Link>
          </li>
        </ul>
      )
    } else {
      navButtons = (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to={'/login'}>Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={'/register'}>Sign Up</Link>
          </li>
        </ul>
      )
    }

    return(
      <nav className="navbar navbar-expand navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={'/'}>Home</Link>
          <div className="collapse navbar-collapse">
            {navButtons}
          </div>
        </div>
      </nav>
    )
  }
}