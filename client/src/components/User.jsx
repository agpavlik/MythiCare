
import "../styles/HomePage.css";
import React, { Component } from "react";
import {Link} from "react-router-dom";


export default class User extends Component {

  render(){
    if(this.props.user){
      return (<h2>Hi {this.props.user.first_name} {this.props.user.last_name}</h2>)
    }
    return (

      <h1> </h1>

    )

  }
};