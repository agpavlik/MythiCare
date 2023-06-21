import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/SitterProfile.css";
import ServiceRequestsList from './ServiceRequestsList';
import Layout from './layout';

const SitterProfile = ({bookingRequests}) => {
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
        <h1 className='sitterprofile-header'>My Sitter Profile</h1>
      <div className='sitterprofile-container'>
        <div className='sitterprofile-info'>
          <img src={sitter.profile_photo} alt={sitter.first_name}></img>
          <p>{sitter.first_name} {sitter.last_name}</p>
          <p>Experience: {sitter.experience}</p>
        </div>
        <div className="service-requests"><ServiceRequestsList bookingRequests={bookingRequests}/></div>
      </div>
    </Layout>
  );
};

export default SitterProfile;