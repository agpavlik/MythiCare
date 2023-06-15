import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const InformationForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [experience, setExperience] = useState('');
  const [contactInfo, setContactInfo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Create an object with the entered information
    const userInfo = {
      firstName,
      lastName,
      address,
      experience,
      contactInfo,
    };
  
    // Reset the form
    setFirstName('');
    setLastName('');
    setAddress('');
    setExperience('');
    setContactInfo('');
  
    // Render the ProfilePage component with the user information
    ReactDOM.render(
      <ProfilePage userInfo={userInfo} />,
      document.getElementById('root')
    );
  };

  return (
    <div>
      <h1>Enter Your Information</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <br />
        <label>
          Experience:
          <textarea
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          ></textarea>
        </label>
        <br />
        <label>
          Contact Info:
          <input
            type="text"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default InformationForm;