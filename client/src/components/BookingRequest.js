import React from 'react';

const BookingRequest = ({ booking, onAccept, onReject }) => {
  return (
    <div>
      <h4>Booking Request:</h4>
      <p>
        Pet Owner has requested your service for {booking.startDate} to {booking.endDate}.
      </p>
      <button onClick={onAccept}>Accept</button>
      <button onClick={onReject}>Reject</button>
    </div>
  );
};

export default BookingRequest;
