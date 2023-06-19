import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AvailabilityCalendar from './AvailabilityCalendar';

const SittersPage = () => {
  const [sitter, setSitter] = useState([])
  const {id} = useParams()

  useEffect(() => {
    const fetchSitter = async () => {
      try {
        const response = await axios.get(`/sitters/${id}`);
        setSitter(response.data.sitter[0])
      } catch (error) {
        console.error('Error fetching sitter:', error);
      }
    };

    fetchSitter();
  }, [id]);

  return (
    <div>
      <h2>{sitter.first_name} {sitter.last_name}</h2>
      <article id='sitter'>
        <img src={sitter.profile_photo} alt={sitter.first_name} className="sitter--photo"/>
        <div className="sitter--info">
          <div>{sitter.bio}</div>
          <div>{sitter.city}, {sitter.country}</div>
          Experience: {sitter.experience} years
          <div>from ${sitter.nightly_rate} per night</div>
          <p>Avg. Rating: {sitter.avg_rating}</p>
        </div>
    </article>
      <AvailabilityCalendar sitterId={sitter.id} nightly_rate={sitter.nightly_rate}/>
    </div>
  );
};

export default SittersPage;
