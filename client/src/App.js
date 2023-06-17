import React, { useState, useEffect, useParams } from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import axios from 'axios';
import './App.css';
import AvailabilityForm from './components/AvailabilityForm';
import AvailabilityCalendar from './components/AvailabilityCalendar';
import BookingRequest from './components/BookingRequest';


function App() {

  const sitterId = 1;
  const ownerId = 1;

  return (
    <div className="App">
   
      
      <AvailabilityForm sitterId={sitterId}/>
      <AvailabilityCalendar sitterId={sitterId} ownerId={ownerId}/>
      {/* <BookingRequest/>  */}
    
    </div>
  );
}

export default App;



