import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
axios.defaults.withCredentials = true

const PetProfile = () => {

  const [pet, setPet] = useState([])
  const { id } = useParams();

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/pets/${id}`);
        console.log("response:", response.data.pet) 
        setPet(response.data.pet[0]);
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };
    fetchPet();
  }, [id]);

  // useEffect(() => {
  //   console.log(pets)
  // }, [pets])

  return (
    <div>
      <h2>Pet Profile: </h2>
      <img src={pet.profile_photo} alt={pet.name} />
      <p>Name: {pet.name}</p>
      <p>Age: {pet.age}</p>
      <p>Size: {pet.size}</p>
      <p>Temperament: {pet.temperament}</p> 
      <p>Feeding Instructions: {pet.feeding_instructions}</p>
      <p>Activity Needs: {pet.activity_needs}</p>
      <p>Medical Conditions: {pet.medical_conditions}</p>
      <p>Notes: {pet.notes}</p>
    </div>
  );
};

export default PetProfile;