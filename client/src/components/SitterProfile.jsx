import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ServiceRequestsList from './ServiceRequestsList';

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
    <div>
      <h1>Sitter Profile</h1>
      <p>First Name: {sitter.firstName}</p>
      <p>Last Name: {sitter.lastName}</p>
      <p>Address: {sitter.address}</p>
      <p>Experience: {sitter.experience}</p>
      <p>Contact Info: {sitter.contactInfo}</p>
      <ServiceRequestsList bookingRequests={bookingRequests}/>
    </div>
  );
};

export default SitterProfile;