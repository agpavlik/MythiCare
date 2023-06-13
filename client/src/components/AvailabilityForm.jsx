import React, { useState } from 'react';
import axios from 'axios';

const AvailabilityForm = () => {
  const [availability, setAvailability] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });

  const handleAvailabilityChange = (event) => {
    const { name, checked } = event.target;
    setAvailability((prevAvailability) => ({
      ...prevAvailability,
      [name]: checked,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.put('/sitters/:id/', { availability });
      console.log('Availability updated successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Set Preferred Working Days</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Monday
          <input
            type="checkbox"
            name="monday"
            checked={availability.monday}
            onChange={handleAvailabilityChange}
          />
        </label>
        <label>
          Tuesday
          <input
            type="checkbox"
            name="tuesday"
            checked={availability.tuesday}
            onChange={handleAvailabilityChange}
          />
        </label>
        <label>
          Wednesday
          <input
            type="checkbox"
            name="tuesday"
            checked={availability.tuesday}
            onChange={handleAvailabilityChange}
          />
        </label>
        <label>
          Thursday
          <input
            type="checkbox"
            name="tuesday"
            checked={availability.tuesday}
            onChange={handleAvailabilityChange}
          />
        </label>
        <label>
          Friday
          <input
            type="checkbox"
            name="tuesday"
            checked={availability.tuesday}
            onChange={handleAvailabilityChange}
          />
        </label>
        <label>
          Saturday
          <input
            type="checkbox"
            name="tuesday"
            checked={availability.tuesday}
            onChange={handleAvailabilityChange}
          />
        </label>
        <label>
          Sunday
          <input
            type="checkbox"
            name="tuesday"
            checked={availability.tuesday}
            onChange={handleAvailabilityChange}
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AvailabilityForm;
