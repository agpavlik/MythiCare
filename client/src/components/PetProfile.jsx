import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout'
import "../styles/PetProfile.css";

axios.defaults.withCredentials = true

const PetProfile = () => {

  const [pet, setPet] = useState([])
  const { id } = useParams();

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/pets/${id}`);
        console.log("response:", response.data.pet) 
        setPet(response.data.pet[0]);
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };
    fetchPet();
  }, [id]);

  useEffect(() => {
    const fetchOwner = async () => {
      const response = await axios.get(`http://localhost:8080/owners`);
      console.log("Pet owner id", response);
    }
    fetchOwner()
  })

  return (
    <Layout>
      <div className="pet-profile-main">
        <div className="sitter-profile-info-photo">
          <img src={pet.profile_photo} alt={pet.name} className="pet-profile-photo"/>
        </div>  

        <div className="pet-profile-info">
          <div className="pet-profile-detailes">
            <h5>Name:</h5>
            <p>{pet.name}</p>
          </div>
          <div className="pet-profile-detailes">
            <h5>Age: {pet.age}</h5>
          </div>
          <div className="pet-profile-detailes">
            <h5>Size: {pet.size}</h5>
          </div>
          <div className="pet-profile-detailes">
            <h5>Temperament: {pet.temperament}</h5>
          </div>
          <div className="pet-profile-detailes">
            <h5>Medical Conditions: {pet.medical_conditions}</h5>
          </div>
        </div>  
          
        <div className="pet-profile-info">
          <div className="pet-profile-detailes">
            <h5>Feeding Instructions: {pet.feeding_instructions}</h5>
          </div>
          <div className="pet-profile-detailes">
            <h5>Activity Needs: {pet.activity_needs}</h5>
          </div>
          <div className="pet-profile-detailes">
            <h5>Activity Needs: {pet.activity_needs}</h5>
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default PetProfile;