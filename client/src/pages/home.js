import Layout from '../components/layout'
import "../styles/home.css";
import React from "react";
import {Link} from "react-router-dom";
import pop from "./pop.mkv";

const Home = () => {
  return (
      <section className="home-section">
        <video className='video' src ={pop} autoPlay loop muted/>
        <div className="home-container">
        <div className="home-box">
          <img className="logo" src="logo-main.png" alt="logo image" />
        </div>

        <div className="home-box-user">
          <Link to={"/sitters"}>
            <button type="button" className="button-home-page">
              <h3>Find a sitter</h3>
            </button>
          </Link>
          <Link to={"/register"}>
            <button type="button" className="button-home-page">
              <h3>Become a sitter</h3>
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
        </div>
      </section>
  )
}

export default Home;