import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from './layout'
import "../styles/SitterProfile.css";
import ServiceRequestsList from './ServiceRequestsList';

const SitterProfile = ({bookingRequests}) => {
  const [sitter, setSitter] = useState(null);
  
  useEffect(() => {
    const fetchSitter = async () => {
      try {
        const response = await axios.get(`/sitters/1`);
        setSitter(response.data.sitter[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSitter();
  }, []);


  // useEffect(() => console.log(sitter), [sitter]) 

  if (!sitter) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
        <div className="sitter-profile-main">
          <div className="sitter-profile-info-photo">
            <img src={sitter.profile_photo} alt={sitter.first_name} className="sitter-profile-photo"/>
            <div className = "sitter-profile-name">
              <h5>{sitter.first_name}&nbsp;{sitter.last_name}</h5>
            </div>
          </div>  

          <div className="sitter-profile-info">
            <h4>My pet sitter profile</h4>
            <div className="sitter-profile-detailes">
              Country&nbsp;/&nbsp;Region
              <h5 className="sitter-profile-output">{sitter.country}</h5>
            </div>
            <div className="sitter-profile-detailes">
              City
              <h5 className="sitter-profile-output">{sitter.city}</h5>
            </div>
            <div className="sitter-profile-detailes">
              Experience
              <h5 className="sitter-profile-output">{sitter.experience}</h5>
            </div>
            <div className="sitter-profile-detailes">
              Avg. Rating
              <h5 className="sitter-profile-output">{sitter.avg_rating}</h5>
            </div>
            <div className="sitter-profile-detailes">
              Bio
              <h5 className="sitter-profile-output">{sitter.bio}</h5>
            </div>
          </div>
          <div className="sitter-profile-info">
            <h4>Pending Booking Requests</h4>
            <div className="service-requests">
              <ServiceRequestsList bookingRequests={bookingRequests}/>
            </div>
          </div>
        </div>
    </Layout>
  );
};

export default SitterProfile;