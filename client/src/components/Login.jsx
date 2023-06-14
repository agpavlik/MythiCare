import React, { Component } from "react";
import axios from "axios";
import {redirect} from "react-router-dom";


export default class Login extends Component {

  state = {};

  //axios.defaults.withCredentials = true;

  handleSubmit = e => {
    e.preventDefault();

    const data = {
      email: this.email,
      password: this.password,
    };

    axios.post('/login', data)
    .then(res => {
      console.log(res)
      localStorage.setItem('token', res.data.token); // do we need the local storage?
      this.setState({
        loggedIn: true
      });
      this.props.setUser(res.data.user);
    })
    .catch(err => {console.log(err)});
  };


  componentDidUpdate(){
    if (this.state.loggedIn){
     redirect("/") // change for page with profile
    }
  };

  componentDidMount(){
    if (this.state.loggedIn){
     redirect("/") // change for page with profile

    }
  };


  render(){
    // if(this.state.loggedIn){
    //   return redirect("/");
    // }
    return <div className="auth-wrapper">
            <div className="auth-inner">
              <form onSubmit={this.handleSubmit}>
                <h3>Login</h3>

                <div className="form-group">
                  <label>Email</label>
                  <input type="email" className="form-control" placeholder="Email" 
                  onChange={e => this.email = e.target.value}/>
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input type="password" className="form-control" placeholder="Password" 
                  onChange={e => this.password = e.target.value}/>
                </div>

                <button className="btn btn-primary btn-block">Login</button>

              </form>
            </div>
          </div>
    }
  }