import React, { useState } from 'react';

const PetSitterForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [experience, setExperience] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, age, experience });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Age:
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
      </label>
      <label>
        Experience:
        <textarea value={experience} onChange={(e) => setExperience(e.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PetSitterForm;