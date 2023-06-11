import React from "react";
import "../styles/HomePage.css";

const HomePage = () => {


  return (
    <section className="home-section">

      <div className="home-box">
        <img className="logo" alt="logo image" />
      </div>

      <div className="home-box">
        <a href="/RegisterPage" className="pages-link">
          <button type="button" className="button-home-page">
            Find a sitter
          </button>
        </a>
        <a href="/SittersPage" className="pages-link">
          <button type="button" className="button-home-page">
            Become a sitter
          </button>
        </a>
      </div>

      <div className="home-box">
        <a href="/LoginPage">
          <button type="button" className="button-login">
            Login
          </button>
        </a>
      </div>

      <div className="home-box">
        <a href="/AboutPage">
          <button type="button" className="button-about">
            Information about app
          </button>
        </a>
      </div>

    </section>
  )
}

export default HomePage;