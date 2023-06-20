import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../components/layout'
axios.defaults.withCredentials = true

const SitterForm = () => {
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  const [bio, setBios] = useState('');
  const [experience, setExperience] = useState('');
  const [nightly_rate, setNightlyRates] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/sitters', {
        // firstName,
        // lastName,
        bio,
        experience,
        nightly_rate,
      });

      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div>
        <h1>Sitter Form</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Bio:
            <input type="text" value={bio} onChange={(e) => setBios(e.target.value)} />
          </label>
          <br />
          <label>
            Experience:
            <input type="text" value={experience} onChange={(e) => setExperience(e.target.value)} />
          </label>
          <br />
          <label>
            Rate:
            <input type="text" value={nightly_rate} onChange={(e) => setNightlyRates(e.target.value)} />
          </label>
          <br />
          <button type="submit">Save</button>
        </form>
      </div>
    </Layout>
  );
};

export default SitterForm;