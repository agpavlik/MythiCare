import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../components/layout'
import "../styles/SitterForm.css";
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
      <div className = "sitter-form-main">
        <div className = "sitter-form-input">
          <form onSubmit={handleSubmit} className="container mt-3">
            <h2>Sitter Form</h2>
            <div className='mb-3'>

              <label className="sitter-form-label">
                Sitter&nbsp;Photo
              </label>
              <input type="file" name="photo" className="sitter-form-photo"/>
            </div>

            <div className='mb-3'>
              <label className='sitter-form-label'>
                Country&nbsp;/&nbsp;Region
              </label>
              <input type="text" value={nightly_rate} className='form-control'/>
            </div>

            <div className='mb-3'>
              <label className='sitter-form-label'>
                City
              </label>
              <input type="text" value={nightly_rate} className='form-control'/>
            </div>

            <div className='mb-3'>
              <label htmlFor='bio' className='sitter-form-label'>
                Bio
              </label>
              <input type="text" value={bio} onChange={(e) => setBios(e.target.value)} className='form-control' required/>
            </div>

            <div className='mb-3'>
              <label className='sitter-form-label'>
                Experience
              </label>
              <input type="text" value={experience} onChange={(e) => setExperience(e.target.value)} className='form-control'/>
            </div>

            <div className='mb-3'>
              <label className='sitter-form-label'>
                Rate
              </label>
              <input type="text" value={nightly_rate} onChange={(e) => setNightlyRates(e.target.value)} className='form-control'/>
            </div>

            <button type="submit" className='button-29'>Save</button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SitterForm;