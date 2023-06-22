import "../styles/ServiceRequestListItem.css";
import axios from 'axios';
import React, { useState } from "react";
import { Link } from "react-router-dom";
import BookingRequest from './BookingRequest';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ServiceRequestListItem = (props) => {
  const { petPhoto, petName, petAge, petId, endDate, startDate, fee, sitterId, bookingId, onDelete } = props;

  const convertDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate;
  };

  const newStartDate = convertDate(startDate);
  const newEndDate = convertDate(endDate);

  const [showComponent, setShowComponent] = useState(true);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleAcceptBooking = () => {
    setConfirmationMessage('Are you sure you want to accept the booking?');
    setConfirmationAction(() => acceptBooking);
    setShowConfirmationModal(true);
  };

  const handleRejectBooking = () => {
    setConfirmationMessage('Are you sure you want to reject the booking?');
    setConfirmationAction(() => rejectBooking);
    setShowConfirmationModal(true);
  };

  const acceptBooking = async () => {
    try {
      await axios.patch(`/sitters/${sitterId}/booking-requests/${bookingId}`, {
        sitterAccepted: true,
        sitterRejected: false,
      });
      setShowComponent(false); // Hide the component
      handleCloseConfirmationModal();
    } catch (error) {
      console.error('Error accepting booking:', error);
    }
  };

  const rejectBooking = async () => {
    try {
      await axios.patch(`/sitters/${sitterId}/booking-requests/${bookingId}`, {
        sitterAccepted: false,
        sitterRejected: true,
      });
      // onDelete(bookingId); // Remove the booking request from the array
      setShowComponent(false); // Hide the component
      handleCloseConfirmationModal();
    } catch (error) {
      console.error('Error rejecting booking:', error);
    }
  };
  

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
    setConfirmationAction(null);
  };

  if (!showComponent) {
    return null; // Don't render anything if the component should be hidden
  }

  return (
    <>
      <Link to={`/petprofile/${petId}`} className = "booking-pet-link">
        <div id='booking-request'>
          <img src={petPhoto} alt={petName} className="booking-pet-photo" />
          <div className="booking-pet-info">
            <h6>Name:&nbsp;{petName}</h6>
            <h6>Age:&nbsp;{petAge}</h6>
            <h6>Requested Dates:<br/>{newStartDate}&nbsp;-&nbsp;{newEndDate}</h6>
            <h6>Total fee:&nbsp;${fee}</h6>
          </div>
        </div>
      </Link>
      <BookingRequest
        onAccept={handleAcceptBooking}
        onReject={handleRejectBooking}
      />
      <Modal show={showConfirmationModal} onHide={handleCloseConfirmationModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {confirmationMessage}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmationModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmationAction}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ServiceRequestListItem;
