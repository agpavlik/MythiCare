import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/layout'
import "../styles/SitterProfile.css";

const SitterProfile = () => {
  const [sitter, setSitter] = useState(null);
  
  useEffect(() => {
    const fetchSitter = async () => {
      try {
        const response = await axios.get(`/sitters/1`);
        setSitter(response.data.sitter[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSitter();
  }, []);


  // useEffect(() => console.log(sitter), [sitter]) 

  if (!sitter) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
        <div className="sitter-profile-main">
          <div className="sitter-profile-info-photo">
            <img src="kovalsky.jpg" alt="Sitter Photo" className="sitter-profile-photo"/>
            <div className = "sitter-profile-name">
              <h5> First Name, Last Name</h5>
          </div>
          </div>  

          <div className="sitter-profile-info">
            <div className="sitter-profile-detailes">
              <h5>Phone</h5>
            </div>
            <div className="sitter-profile-detailes">
              <h5>Email</h5>
            </div>
            <div className="sitter-profile-detailes">
              <h5>Country&nbsp;/&nbsp;Region</h5>
            </div>
            <div className="sitter-profile-detailes">
              <h5>City</h5>
            </div>
            <div className="sitter-profile-detailes">
              <h5>Bio</h5>
            </div>
            <div className="sitter-profile-detailes">
              <h5>Experience</h5>
            </div>
 
            <div className="sitter-profile-detailes">
              <h5>Rate</h5>
            </div>
          </div> 
          <div className="sitter-profile-info"> 

          </div>
        </div>
    </Layout>
  );
};

export default SitterProfile;