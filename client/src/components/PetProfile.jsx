import React from 'react';

const PetProfile = ({ pet }) => {
  return (
    <div>
      <h2>Pet Profile: {pet.name}</h2>
      <img src={pet.photo} alt={pet.name} />
      <p>Name: {pet.name}</p>
      <p>Age: {pet.age}</p>
      <p>Size: {pet.size}</p>
      <p>Temperament: {pet.temperament}</p>
      <p>Feeding Info: {pet.feedingInfo}</p>
      <p>Activity Needs: {pet.activityNeeds}</p>
      <p>Medical Conditions: {pet.medicalConditions}</p>
      <p>Notes: {pet.notes}</p>
    </div>
  );
};

export default PetProfile;