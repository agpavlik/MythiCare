import React, { Component } from "react";
import axios from "axios";

export default class Register extends Component {

  handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      first_name: this.firstName,
      last_name: this.lastName,
      email: this.email,
      password: this.password,
      password_confirm: this.confirmPassword
    };

    // Validate the form fields
    if (!data.first_name || !data.last_name || !data.email || !data.password || !data.password_confirm) {
      alert('Please fill in all fields');
      return;
    }
    if (data.password !== data.password_confirm) {
      alert('Password and confirmation do not match');
      return;
    }

    axios.post('/register', data)
      .then(res => {console.log(res)})
      .catch(err => {console.log(err)});

    // // Send the form data to the server
    //   const response = await fetch('/api/register', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ first_name, last_name, email, password }),
    //   });

    //   if (response.ok) {
    //     // Registration successful, redirect to another page
    //     window.location.href = '/dashboard';
    //   } else {
    //     const error = await response.json();
    //     alert(error.message);
    //   }
    // }

  };

  render() {
    return(
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={this.handleSubmit}>
            <h3>Sign Up</h3>

            <div className="form-group">
              <label>First Name</label>
              <input type="text" className="form-control" placeholder="First Name" 
                onChange={e => this.firstName = e.target.value}/>
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input type="text" className="form-control" placeholder="Last Name" 
              onChange={e => this.lastName = e.target.value}/>
            </div>

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

            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" className="form-control" placeholder="Confirm Password"
              onChange={e => this.confirmPassword = e.target.value}/>
            </div>

            <button className="btn btn-primary btn-block">Sign Up</button>

          </form>
        </div>
      </div>
    )
  }
}