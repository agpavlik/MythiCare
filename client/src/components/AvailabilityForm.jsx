import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AvailabilityForm = ({ sitterId }) => {
  const [availability, setAvailability] = useState([]);

  const handleAvailabilityChange = (e) => {
    const selectedDay = e.target.value;
    if (e.target.checked) {
      setAvailability([...availability, selectedDay]);
    } else {
      setAvailability(availability.filter((day) => day !== selectedDay));
    }
  };

  const saveAvailability = async () => {
    try {
      await axios.post(`/sitters/${sitterId}/availability`, { availability });
      console.log("Availability updated!!")
    } catch (error) {
      console.error('Error saving availability:', error);
    }
  };

  return (
    <div>
      <label>
        Monday:
        <input
          type="checkbox"
          name="monday"
          checked={availability.monday}
          onChange={handleAvailabilityChange}
        />
      </label>
      <label>
        Tuesday:
        <input
          type="checkbox"
          name="tuesday"
          checked={availability.tuesday}
          onChange={handleAvailabilityChange}
        />
      </label>
      <label>
        Wednesday:
        <input
          type="checkbox"
          name="wednesday"
          checked={availability.wednesday}
          onChange={handleAvailabilityChange}
        />
      </label>
      <label>
        Thursday:
        <input
          type="checkbox"
          name="thursday"
          checked={availability.thursday}
          onChange={handleAvailabilityChange}
        />
      </label>
      <label>
        Friday:
        <input
          type="checkbox"
          name="friday"
          checked={availability.friday}
          onChange={handleAvailabilityChange}
        />
      </label>
      <label>
        Saturday:
        <input
          type="checkbox"
          name="saturday"
          checked={availability.saturday}
          onChange={handleAvailabilityChange}
        />
      </label>
      <label>
        Sunday:
        <input
          type="checkbox"
          name="sunday"
          checked={availability.sunday}
          onChange={handleAvailabilityChange}
        />
      </label>
      <button onClick={saveAvailability}>Save Availability</button>
    </div>
  );
}

export default AvailabilityForm;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AvailabilityForm = ({sitterId}) => {

  
//   const [availability, setAvailability] = useState({
//     monday: false,
//     tuesday: false,
//     wednesday: false,
//     thursday: false,
//     friday: false,
//     saturday: false,
//     sunday: false,
//   });

//   const handleAvailabilityChange = (event) => {
//     const { name, checked } = event.target;
//     setAvailability((prevAvailability) => ({
//       ...prevAvailability,
//       [name]: checked,
//     }));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     // Send an HTTP request to your backend server to update the database
//     // with the formData values
//     // You can use a library like axios to make the request

//     // Example axios request:
//     // axios.post('/api/updateAvailability', formData)
//     //   .then((response) => {
//     //     // Handle success
//     //   })
//     //   .catch((error) => {
//     //     // Handle error
//     //   });
//     try {
//       await axios.put(`/sitters/${sitterId.id}`, { availability }); 
//       console.log('Availability updated successfully');
//     } catch (error) {
//       console.error("Error", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Set Preferred Working Days</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Monday
//           <input
//             type="checkbox"
//             name="monday"
//             checked={availability.monday}
//             onChange={handleAvailabilityChange}
//           />
//         </label>
//         <label>
//           Tuesday
//           <input
//             type="checkbox"
//             name="tuesday"
//             checked={availability.tuesday}
//             onChange={handleAvailabilityChange}
//           />
//         </label>
//         <label>
//           Wednesday
//           <input
//             type="checkbox"
//             name="wednesday"
//             checked={availability.wednesday}
//             onChange={handleAvailabilityChange}
//           />
//         </label>
//         <label>
//           Thursday
//           <input
//             type="checkbox"
//             name="thursday"
//             checked={availability.thursday}
//             onChange={handleAvailabilityChange}
//           />
//         </label>
//         <label>
//           Friday
//           <input
//             type="checkbox"
//             name="friday"
//             checked={availability.friday}
//             onChange={handleAvailabilityChange}
//           />
//         </label>
//         <label>
//           Saturday
//           <input
//             type="checkbox"
//             name="saturday"
//             checked={availability.saturday}
//             onChange={handleAvailabilityChange}
//           />
//         </label>
//         <label>
//           Sunday
//           <input
//             type="checkbox"
//             name="sunday"
//             checked={availability.sunday}
//             onChange={handleAvailabilityChange}
//           />
//         </label>
//         <button type="submit">Save</button>
//       </form>
//     </div>
//   );
// };

// export default AvailabilityForm;
