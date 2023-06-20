import Layout from '../components/layout'
// import React, {useState, useEffect} from "react";
// import {Link} from "react-router-dom";
import SitterItem from "../components/sitterItem"
import "../styles/allsitters.css"

const AllSitters = ({sitters}) => {

  if (sitters) {
    const parsedSitters = sitters.map(sitter => {
      return <SitterItem
        profile_photo={sitter.profile_photo}
        first_name={sitter.first_name}
        last_name={sitter.last_name}
        key={sitter.id}
        sitterId={sitter.id}
        bio={sitter.bio}
        experience={sitter.experience}
        city={sitter.city}
        country={sitter.country}
        nightly_rate={sitter.nightly_rate}
        avg_rating={sitter.rating}
      />
    })

    return (
      <Layout>
          <div className="allsitters-main">
            {parsedSitters}
          </div>
      </Layout>
    )
  }
}

export default AllSitters;