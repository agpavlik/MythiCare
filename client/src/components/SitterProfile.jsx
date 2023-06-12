import React from 'react';

const PetSitterProfile = ({ name, age, experience }) => {
  return (
    <div>
      <h2>Profile</h2>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <p>Experience: {experience}</p>
    </div>
  );
};

export default PetSitterProfile;