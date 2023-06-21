import React, {} from 'react';
import axios from 'axios';
import ServiceRequestListItem from './ServiceRequestListItem';

const ServiceRequestsList = ({bookingRequests}) => {

  console.log(bookingRequests);

  if (bookingRequests) {
    const parsedBookings = bookingRequests.map(booking => {
      return <ServiceRequestListItem
      petPhoto={booking.profile_photo}
      petName={booking.name}
      petAge={booking.age}
      key={booking.id}
      petId={booking.pet_id}
      startDate={booking.start_date}
      endDate={booking.end_date}
      fee={booking.fee}
      sitterId={booking.sitter_id}
      bookingId={booking.id}
      />
    })
    return (
      <section id='service-requests'>
        {parsedBookings}
      </section>
    )
  }
}

export default ServiceRequestsList;