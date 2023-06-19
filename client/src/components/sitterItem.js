import Layout from '../components/layout'
import "../styles/sitterItem.css";
import React from "react";
import {Link} from "react-router-dom";

const SitterItem = (props) => {

  const {profile_photo, first_name, last_name, bio, experience, city, country, nightly_rate, avg_rating, sitterId} = props;


  return (
    <Link to={`/sitter/${sitterId}`}>
      <article id='sitter'>
        
        <img src={profile_photo} alt={first_name} className="sitter--photo"/>
        <div className="sitter--info">
          <p>{first_name} {last_name}</p>
          <div>{bio}</div>
          <div>{city}, {country}</div>
          Experience: {experience} years
          <div>from ${nightly_rate} per night</div>
          <p>Avg. Rating: {avg_rating}</p>
        </div>
      </article>
    </Link>
  
    )
};

export default SitterItem;