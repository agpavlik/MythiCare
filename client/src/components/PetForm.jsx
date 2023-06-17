import React, { useState } from 'react';
import axios from 'axios';

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPetData({ ...petData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/pets', petData);
      console.log('Pet profile added:', petData);
      // Reset the form or display a success message
    } catch (error) {
      console.error('Error adding pet profile:', error);
      // Handle the error and display an error message to the user
    }
  };

  return (
    <div>
      <h2>Add a Pet Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Pet Photo:
          <input type="file" name="photo" onChange={handleInputChange} />
        </label>
        <label>
          Name:
          <input type="text" name="name" value={petData.name} onChange={handleInputChange} />
        </label>
        <label>
          Age:
          <input type="number" name="age" value={petData.age} onChange={handleInputChange} />
        </label>
        <label>
          Size:
          <input type="text" name="size" value={petData.size} onChange={handleInputChange} />
        </label>
        <label>
          Temperament:
          <input type="text" name="temperament" value={petData.temperament} onChange={handleInputChange} />
        </label>
        <label>
          Feeding Info:
          <input type="text" name="feedingInfo" value={petData.feedingInfo} onChange={handleInputChange} />
        </label>
        <label>
          Activity Needs:
          <input type="text" name="activityNeeds" value={petData.activityNeeds} onChange={handleInputChange} />
        </label>
        <label>
          Medical Conditions:
          <input type="text" name="medicalConditions" value={petData.medicalConditions} onChange={handleInputChange} />
        </label>
        <label>
          Notes:
          <textarea name="notes" value={petData.notes} onChange={handleInputChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PetForm;