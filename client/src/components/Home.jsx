
import "../styles/HomePage.css";
import React, { Component } from "react";
import {Link} from "react-router-dom";


export default class Home extends Component {
  
  render(){
    if(this.props.user){
      return (<h2>Hi {this.props.user.first_name} {this.props.user.last_name}</h2>)
    }

    return (
      <section className="home-section">
        <div className="home-box">
          <img className="logo" alt="logo image" />
        </div>

        <div className="home-box">
          <Link to={"/sitters"} className="pages-link">
            <button type="button" className="button-home-page">
              Find a sitter
            </button>
          </Link>
          <Link to={"/register"} className="pages-link">
            <button type="button" className="button-home-page">
              Become a sitter
            </button>
          </Link>
        </div>

        <div className="home-box">
          <Link to={"/login"}>
            <button type="button" className="button-login">
              Login
            </button>
          </Link>
        </div>

        <div className="home-box">
          <Link to={"/about"}>
            <button type="button" className="button-about">
              Information about app
            </button>
          </Link>
        </div>

      </section>
    )
  }
}