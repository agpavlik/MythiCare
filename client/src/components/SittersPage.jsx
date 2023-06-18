import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AvailabilityCalendar from './AvailabilityCalendar';

const SittersPage = () => {
  const [sitterId, setSitterId] = useState('');

  useEffect(() => {
    const fetchSitterId = async () => {
      try {
        const response = await axios.get('/sitters/:id');
        setSitterId(response.data.sitterId);
      } catch (error) {
        // Handle the error gracefully
      }
    };

    fetchSitterId();
  }, []);

  useEffect(() => {
    console.log(sitterId)
  }, [sitterId])

  return (
    <div>
      <h1>Pet Sitter Profile</h1>
      {/* Render other components and information for the pet sitter profile */}
      <AvailabilityCalendar sitterId={sitterId} />
    </div>
  );
};

export default SittersPage;
