import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import BookingRequest from './BookingRequest';

const AvailabilityCalendar = ({ sitterId, ownerId, nightly_rate }) => {
  const [availability, setAvailability] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [nightlyRate, setNightlyRate] = useState(0);
  const [fee, setFee] = useState(0);
  const [selectedPet, setSelectedPet] = useState(null);
  const [pets, setPets] = useState([]);
  const [bookingRequest, setBookingRequest] = useState(null);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await axios.get(`/sitters/${sitterId}/availability`);
        console.log(response)
        setAvailability(response.data.availability);
      } catch (error) {
        console.error('Error fetching availability:', error);
      }
    };

    // const fetchNightlyRate = async () => {
    //   try {
    //     const response = await axios.get(`/sitters/${sitterId}/nightly_rate`);
    //     setNightlyRate(response.data.nightlyRate);
    //   } catch (error) {
    //     console.error('Error fetching nightly rate:', error);
    //   }
    // };

    const fetchPets = async () => {
      try {
        const response = await axios.get(`/owners/${ownerId}/pets`);
        setPets(response.data.pet);
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };

    // const fetchBookingRequest = async () => {
    //   try {
    //     const response = await axios.get(`/sitters/${sitterId}/booking-requests`);
    //     setBookingRequest(response.data.bookingRequest);
    //   } catch (error) {
    //     console.error('Error fetching booking request:', error);
    //   }
    // };

    fetchAvailability();
    // fetchNightlyRate();
    fetchPets();
    // fetchBookingRequest();
  }, [sitterId, ownerId]);

  useEffect(() => {
    const calculateFee = () => {
      const numOfDays = selectedDates.length;
      // const calculatedFee = nightlyRate * numOfDays;
      const calculatedFee = {nightly_rate} * numOfDays;
      setFee(calculatedFee);
    };

    calculateFee();
  }, [selectedDates, nightly_rate]);

  const handleDateSelect = (date) => {
    const selectedDate = new Date(date);
    const updatedDates = [...selectedDates, selectedDate];
    setSelectedDates(updatedDates);
  };

  const handleSubmit = async () => {
    try {
      const bookingData = {
        petId: selectedPet,
        sitterId,
        startDate: selectedDates[0].toISOString().slice(0, 10),
        endDate: selectedDates[selectedDates.length - 1].toISOString().slice(0, 10),
        fee: fee,
        isComplete: false,
      };

      const response = await axios.post(`/sitters/${sitterId}/bookings`, bookingData);
      console.log(response.data);

      setSelectedDates([]);
      setSelectedPet(null);
    } catch (error) {
      console.error('Error inserting booking:', error);
    }
  };

  // const handleAcceptBooking = async () => {
  //   try {
  //     await axios.patch(`/sitters/bookings/${bookingRequest.id}`, {
  //       sitterAccepted: true,
  //       sitterRejected: false,
  //     });
  //     // Notify the pet owner about the acceptance via email email)
  //     setBookingRequest(null);
  //   } catch (error) {
  //     console.error('Error accepting booking:', error);
  //   }
  // };

  // const handleRejectBooking = async () => {
  //   try {
  //     await axios.patch(`/sitters/bookings/${bookingRequest.id}`, {
  //       sitterAccepted: false,
  //       sitterRejected: true,
  //     });
  //     // Notify the pet owner about the rejection via email)
  //     setBookingRequest(null);
  //   } catch (error) {
  //     console.error('Error rejecting booking:', error);
  //   }
  // };

  return (
    <div>
      <div>
        <label htmlFor="petSelect">Select Pet:</label>
        <select id="petSelect" value={selectedPet} onChange={(e) => setSelectedPet(e.target.value)}>
          <option value="">Select a pet</option>
          {pets.map((pet) => (
            <option key={pet.id} value={pet.id}>
              {pet.name}
            </option>
          ))}
        </select>
      </div>
      <Calendar
        value={new Date()}
        tileClassName={({ date }) => (availability.includes(getDayOfWeek(date)) ? 'available' : null)}
        onClickDay={handleDateSelect}
      />
      <div>
        <h4>Selected Dates:</h4>
        <ul>
          {selectedDates.map((date, index) => (
            <li key={index}>{date.toLocaleDateString()}</li>
          ))}
        </ul>
        <p>Total Fee: ${fee}</p>
      </div>
      <button onClick={handleSubmit}>Submit Booking</button>

      {/* {bookingRequest && (
        <BookingRequest
          booking={bookingRequest}
          onAccept={handleAcceptBooking}
          onReject={handleRejectBooking}
        />
      )} */}
    </div>
  );
};

const getDayOfWeek = (date) => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return daysOfWeek[date.getDay()];
};

export default AvailabilityCalendar;
