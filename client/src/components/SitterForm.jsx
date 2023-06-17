import React, { useState } from 'react';
import axios from 'axios';

const SitterForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [experience, setExperience] = useState('');
  const [contactInfo, setContactInfo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/sitters', {
        firstName,
        lastName,
        address,
        experience,
        contactInfo,
      });

      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Sitter Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </label>
        <br />
        <label>
          Address:
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </label>
        <br />
        <label>
          Experience:
          <input type="text" value={experience} onChange={(e) => setExperience(e.target.value)} />
        </label>
        <br />
        <label>
          Contact Info:
          <input type="text" value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} />
        </label>
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default SitterForm;