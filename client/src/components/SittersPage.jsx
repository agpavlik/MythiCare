import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AvailabilityCalendar from './AvailabilityCalendar';
import Layout from '../components/layout'
import "../styles/SittersPage.css";

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

  useEffect(() => {
    console.log(sitter)
  }, [sitter])

  return (
    <Layout>
      <div className= "sitters-page-main">
        <div className= "sitter-page-detailes">
          <h4>{sitter.first_name} &nbsp;{sitter.last_name}</h4>
          <img src={sitter.profile_photo} alt={sitter.first_name} className="sitter-page-photo"/>
          <article id='sitter'>
            <div className="sitter-page-info">{sitter.city}, {sitter.country}</div>
            <div className="sitter-page-info">{sitter.bio}</div>
            <div className="sitter-page-info">Experience: {sitter.experience} years</div>
            <div className="sitter-page-info">Avg. Rating: {sitter.rating}</div>
            <div className="sitter-page-info">Price from ${sitter.nightly_rate} per night</div>
          </article>
        </div>
        <div className = "sitter-page-calendar">
          <AvailabilityCalendar sitterId={sitter.sitter_id} nightly_rate={sitter.nightly_rate}/>
        </div>
      </div>
    </Layout>
  );
};

export default SittersPage;
