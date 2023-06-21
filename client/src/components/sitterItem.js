import Layout from '../layout'
import "../styles/sitterItem.css";
import React from "react";
import {Link} from "react-router-dom";

const SitterItem = (props) => {

  const {profile_photo, first_name, last_name, bio, experience, city, country, nightly_rate, avg_rating, sitterId} = props;


  return (
    <Link to={`/sitter/${sitterId}`} className = "sitter-item-link">
        <div className="sitter-item-detailes">
          <img src={profile_photo} alt={first_name} className="sitter-item-photo"/>
          <div class="sitter-item-info"> <h6>{first_name} {last_name}</h6></div>
          <div class="sitter-item-info">{city}, {country}</div>
          <div class="sitter-item-info">Experience: {experience} years</div>
          <div class="sitter-item-info">{bio}</div>
          <div class="sitter-item-info">Avg. Rating: {avg_rating}</div>
          <div class="sitter-item-info">Price from ${nightly_rate} per night</div>
        </div>
    </Link>
  
    )
};

export default SitterItem;