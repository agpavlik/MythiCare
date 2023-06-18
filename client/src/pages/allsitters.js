import Layout from '../components/layout'
import "../styles/sitters.css";
import React, {useState, useEffect} from "react";
import axios from 'axios';
import {Link} from "react-router-dom";
import SitterItem from "../components/sitterItem"

const AllSitters = (props) => {

  const [sitters, setSitters] = useState(null);

  const fetchSitters = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/sitters`);
      console.log(response)
      setSitters(response);
    } catch (error) {
      console.error('Error fetching availability:', error);
    }
  };
  
  fetchSitters();


  return (
    <Layout>
      <section className="sitters-section">
        <p>This is a sitter page</p>
      </section>
    </Layout>
  )
}

export default AllSitters;