import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../components/layout'
import "../styles/PetForm.css";
import { Navigate, useNavigate } from 'react-router-dom'; 
axios.defaults.withCredentials = true

const PetForm = () => {
  const [petData, setPetData] = useState({
    photo: '',
    name: '',
    age: '',
    size: '',
    temperament: '',
    feedingInfo: '',
    activityNeeds: '',
    medicalConditions: '',
    notes: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPetData({ ...petData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/pets', petData);
      console.log('Pet profile added:', petData);
      const petId = response.data.id; //
      navigate(`/petprofile/${petId}`); // Redirect to the pet/:id page
    } catch (error) {
      console.error('Error adding pet profile:', error);
    }
  };

  return (
    <Layout>
      <div className = "pet-form-main">
        <div className = "pet-form-input">
          <form onSubmit={handleSubmit} className="container mt-3">
            <h2>Add a Pet Profile</h2>

            <div className='mb-3'>
              <label className="pet-form-label">
                Pet&nbsp;Photo
              </label>
              <input type="file" name="photo" onChange={handleInputChange} className="pet-photo"/>
            </div>

            <div className='mb-3-plus'>
              <label className="pet-form-label">
                Name
              </label>
              <input type="text" name="name" value={petData.name} onChange={handleInputChange} className="form-control"/>

              <label className="pet-form-label">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Age
              </label>
              <input type="number" name="age" value={petData.age} onChange={handleInputChange} className="form-control"/>
            </div>

            <div className='mb-3-plus'>
              <label className="pet-form-label">
                Size
              </label>
              <input type="text" name="size" value={petData.size} onChange={handleInputChange} className="form-control"/>

              <label className="pet-form-label">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Temperament
              </label>
              <input type="text" name="temperament" value={petData.temperament} onChange={handleInputChange} className="form-control"/>
            </div>

            <div className='mb-3-plus'>
              <label className="pet-form-label">
                Feeding&nbsp;Info
              </label>
              <input type="text" name="feedingInfo" value={petData.feedingInfo} onChange={handleInputChange} className="form-control"/>

              <label className="pet-form-label">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Activity&nbsp;Needs
              </label>
              <input type="text" name="activityNeeds" value={petData.activityNeeds} onChange={handleInputChange} className="form-control"/>
            </div>

            <div className='mb-3-plus'>
              <label className="pet-form-label">
                Medical&nbsp;Conditions
              </label>
              <input type="text" name="medicalConditions" value={petData.medicalConditions} onChange={handleInputChange} className="form-control"/>

              <label className="pet-form-label">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Notes
              </label>
              <textarea name="notes" value={petData.notes} onChange={handleInputChange} className="form-control"/>
            </div>

            <button type="submit" className='button-29'>
              Submit
            </button>

          </form>
        </div>
      </div>
    </Layout>
  );
};

export default PetForm;