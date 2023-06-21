import React from 'react';
import "../styles/BookingRequest.css";

const BookingRequest = ({ onAccept, onReject }) => {
  return (
    <div className="booking-request-main">
      <button type="button" className="btn btn-outline-success" onClick={onAccept}>Accept</button>
      <button type="button" className="btn btn-outline-danger" onClick={onReject}>Reject</button>
    </div>
  );
};

export default BookingRequest;
