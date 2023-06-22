import React, {useState} from 'react';
import axios from 'axios';
import ServiceRequestListItem from './ServiceRequestListItem';

const ServiceRequestsList = ({bookingRequests}) => {
  
  console.log(bookingRequests);

  const [requests, setRequests] = useState(bookingRequests);

  const handleDeleteBooking = async () => {
    try {
      await axios.delete(`/sitters/1/booking-requests/1`);
      const updatedRequests = requests.filter((request) => request.booking.id !== 1);
      setRequests(updatedRequests);
    } catch (error) {
      console.error('Error deleting booking request:', error);
    }
  };

  // if (!requests || requests.length === 0) {
  //   return <div>No booking requests found.</div>;
  // }

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
      onDelete={handleDeleteBooking}
      />
    })
    return (
      <section id='service-requests'>
        {parsedBookings}
      </section>
    )
  } else {
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
      onDelete={handleDeleteBooking}
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