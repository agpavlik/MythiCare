import React from 'react';

const BookingRequest = ({ onAccept, onReject }) => {
  return (
    <div>
      <button onClick={onAccept}>Accept</button>
      <button onClick={onReject}>Reject</button>
    </div>
  );
};

export default BookingRequest;
