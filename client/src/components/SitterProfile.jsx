import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SitterProfile = ({ id }) => {
  const [sitter, setSitter] = useState(null);

  useEffect(() => {
    const fetchSitter = async () => {
      try {
        const response = await axios.get(`/api/sitters/${id}`);
        setSitter(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSitter();
  }, [id]);

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
    </div>
  );
};

export default SitterProfile;