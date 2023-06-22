import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DateRangePicker from './DateRangePicker';
import 'react-calendar/dist/Calendar.css';
import BookingRequest from './BookingRequest';
import { useParams } from 'react-router-dom';
import "../styles/AvailabilityCalendar.css";

const AvailabilityCalendar = (props) => {
  const { sitterId, nightly_rate } = props;
  const {id} = useParams;

  const [availability, setAvailability] = useState([]);
  const [selectedRange, setSelectedRange] = useState({ start: null, end: null });
  const [fee, setFee] = useState(0);
  const [selectedPet, setSelectedPet] = useState(null);
  const [pets, setPets] = useState([]);
  const [bookingRequest, setBookingRequest] = useState(null);


  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await axios.get(`/sitters/${id}/availability`);
        console.log(response);
        setAvailability(response.data.availability);
      } catch (error) {
        console.error('Error fetching availability:', error);
      }
    };

    const fetchPets = async () => {
      try {
        const response = await axios.get(`/owners/11/pets`);
        console.log(response);
        setPets(response.data.pet);
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };

    fetchAvailability();
    fetchPets();
  }, [id]);

  useEffect(() => {
    const calculateFee = () => {
      if (selectedRange.start && selectedRange.end) {
        const numOfDays = Math.ceil(
          (selectedRange.end - selectedRange.start) / (1000 * 60 * 60 * 24) + 1
        );
        const calculatedFee = nightly_rate * numOfDays;
        setFee(calculatedFee);
      } else {
        setFee(0);
      }
    };

    calculateFee();
  }, [selectedRange, nightly_rate]);

  const handleRangeSelect = ({ startDate, endDate }) => {
    setSelectedRange({ start: startDate, end: endDate });
  };

  const handleSubmit = async () => {
    try {
      const bookingData = {
        petId: 11,
        sitter_id: 1,
        startDate: selectedRange.start.toISOString().slice(0, 10),
        endDate: selectedRange.end.toISOString().slice(0, 10),
        fee: fee,
        isComplete: false,
      };

      const response = await axios.post(`/sitters/${sitterId}/bookings`, bookingData);
      console.log(response.data);

      setSelectedRange({ start: null, end: null });
      setSelectedPet(null);
    } catch (error) {
      console.error('Error inserting booking:', error);
    }
  };

  return (
    <div className = "calendar-main">
      <div className = "calendar-pet-select">
        <label htmlFor="petSelect"></label>
        <select id="petSelect" value={selectedPet} onChange={(e) => setSelectedPet(e.pet_id)}>
          <option value="">Select a pet</option>
          {pets.map((pet) => (
            <option key={pet.id} value={pet.id}>
              {pet.name}
            </option>
          ))}
        </select>
      </div>
      <div className = "calendar-date-range">
          <DateRangePicker onChange={handleRangeSelect} />
        <div>
          <h5>Selected Dates:</h5>
          {selectedRange.start && selectedRange.end ? (
            <p>
              {selectedRange.start.toLocaleDateString()} - {selectedRange.end.toLocaleDateString()}
            </p>
          ) : (
            <p>No date range selected</p>
          )}
          <p>Total Due to Sitter: ${fee}</p>
        </div>
      </div>
      <div className = "calendar-btn">
        <button onClick={handleSubmit} className="button-29">Submit Booking</button>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;
