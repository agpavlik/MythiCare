
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import React, {Component} from 'react';
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import Nav from "./components/nav.component";
import Login from "./components/Login";
import Register from "./components/Register";

import './App.css';

export default class App extends Component {

  state = {};

  componentDidMount = () => {
    axios.get('user')
      .then(res => {
        this.setState(res.data);
      },
        err => {console.log(err) // should I delete it?
      }
    )
  };

  setUser = user => {
    this.setState({
      user: user
    });
  };

  render () {
    return (
      <BrowserRouter>
        <div className="App">
          <Nav user={this.state.user}/>
          <Routes>
            <Route path='/' element={<Home user={this.state.user}/>}></Route>
            <Route path='/login' element={<Login setUser={this.setUser}/>}></Route>
            <Route path='/register' element={<Register />}></Route>
          </Routes>
        </div>
      </BrowserRouter>

    );
  }
}


