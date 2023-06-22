import Layout from '../components/layout'
import "../styles/about.css";
import React from "react";

const About = () => {
  return (
    <Layout>
      <div className = "about-main">
      <div className="about-content">
        <h2>About Mythicare</h2>
        <p>Welcome to Mythicare, our pet sitting app where you can find or become a sitter for the rarest, cuddliest, fire-breathiest, and unholiest abominations ever conceived by the human mind. (It also works as a fully functional pet sitter app for Chihuahuas and other "boring" pets if you prefer.)</p>
        <p>With our pet app, you can:</p>
        <ul>
          <li>Utilize our robust profiling system to create profiles for your specific pets, including information such as their vaccination status and their typical daily consumption of children.</li>
          <li>Connect with pet sitters who can handle your pets' unique needs and are located in your area. Alternatively, become a pet sitter yourself and tame a new beast to your whim.</li>
          <li>Conveniently and securely book pet sitting services.</li>
          <li>Receive updates and photos of your beloved pets during the sitting period.</li> 
        </ul>
        <p>Our team of dedicated developers and pet enthusiasts have worked tirelessly under the watchful eye of our Lighthouse Labs overlords to bring this app to you today!</p>
        <p>Enjoy peace of mind knowing that your pets are in good hands with Mythicare, our Pet Sitter app!</p>
      </div>
      </div>
    </Layout>
  )
}

export default About