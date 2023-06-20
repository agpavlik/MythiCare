import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ServiceRequestListItem from './ServiceRequestsListItem';

const ServiceRequestsList = ({bookingRequests}) => {

  console.log(bookingRequests);
  
  if (bookingRequests) {

    return <ServiceRequestListItem
      pet_profile_photo={bookingRequests.profile_photo}
      pet_name={bookingRequests.name}
      pet_age={bookingRequests.age}
    />
  }
}

export default ServiceRequestsList;