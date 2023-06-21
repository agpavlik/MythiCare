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
          <br/>
          <h4>{pet.name}</h4>
        </div>  

        <div className="pet-profile-info">
          <div className="pet-profile-detailes">
            Age:
            <h5 className="pet-profile-output">{pet.age}</h5>
          </div>
          <div className="pet-profile-detailes">
            Size:
            <h5 className="pet-profile-output">{pet.size}</h5>
          </div>
          <div className="pet-profile-detailes">
            Temperament:
            <h5 className="pet-profile-output">{pet.temperament}</h5>
          </div>
          <div className="pet-profile-detailes">
            Medical Conditions:
            <h5 className="pet-profile-output">{pet.medical_conditions}</h5>
          </div>
        </div>  
          
        <div className="pet-profile-info">
          <div className="pet-profile-detailes">
            Feeding Instructions:
            <h5 className="pet-profile-output">{pet.feeding_instructions}</h5>
          </div>
          <div className="pet-profile-detailes">
            Activity Needs:
            <h5 className="pet-profile-output">{pet.activity_needs}</h5>
          </div>
          <div className="pet-profile-detailes">
            Notes:
            <h5 className="pet-profile-output">{pet.notes}</h5>
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default PetProfile;