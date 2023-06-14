
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import React, {Component} from 'react';
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import User from "./components/User";
import Nav from "./components/nav.component";
import Login from "./components/Login";
import Register from "./components/Register";
import About from "./components/About";
import Sitters from "./components/Sitters";

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
            <Route path='/' element={<Home/>}></Route>
            <Route path='/user' element={<User user={this.state.user}/>}></Route>
            <Route path='/login' element={<Login setUser={this.setUser}/>}></Route>
            <Route path='/register' element={<Register user={this.state.user}/>}></Route>
            <Route path='/about' element={<About />}></Route>
            <Route path='/sitters' element={<Sitters />}></Route>
          </Routes>
        </div>
      </BrowserRouter>

    );
  }
}


