import axios from 'axios';
import React, { useState, useEffect } from 'react';
axios.defaults.withCredentials = true

const PetProfile = ({ pet }) => {

  const [pets, setPets] = useState(null)

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/test/1`);
        console.log("response:", response)
        setPets(response);
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };
    fetchPets();
  }, [1]);


  return (
    <div>
      <h2>Pet Profile: </h2>
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