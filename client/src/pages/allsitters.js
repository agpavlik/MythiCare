import Layout from '../components/layout'
import "../styles/sitters.css";
import React from "react";
import {Link} from "react-router-dom";
import SitterItem from "../components/sitterItem"

const AllSitters = (props) => {


  // const parsedSittersId = props.pet_sitters.map((pet_sitter) => {
  //   return (
  //     <SitterItem
  //     {... pet_sitter}
  //     key = {pet_sitter.id}
  //     />
  //   )
  // });

  return (
    <Layout>
      <section className="sitters-section">
        <p>This is a sitter page</p>
      </section>
    </Layout>
  )
}

export default AllSitters;