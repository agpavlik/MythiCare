const express = require('express');
const router = express.Router();
const sitters = require('../../db/queries/sitters')
const db = require('../../configs/db.config');

router.get('/', (req, res) => {
  try {
    sitters.getAllSitters().then(data => {
      console.log(data);
      res.json({sitters: data});
    })
  } catch {
    console.error('Error retrieving sitter profiles:', error);
    res.status(500
		).json({ error: 'Error retrieving sitter profiles' });
  }
});

 // Retrieve a specific sitter profile by ID
router.get('/:id', (req, res) => {
  try {
    const sitterId = req.params.id;
    sitters.getSitterById(sitterId).then(data => {
      console.log(data);
      res.json({sitter: data});
    })
  } catch {
    console.error('Error retrieving sitter profile:', error);
    res.status(500).json({ error: 'Error retrieving sitter profile' });
  }
});

// Create a new sitter profile
router.post('/', async (req, res) => {
  try {
    const { bio, experience, nightly_rate } = req.body;
    const query = 'INSERT INTO pet_sitters (bio, experience, nightly_rate) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [bio, experience, nightly_rate];
    const result = await db.query(query, values);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error creating sitter profile:', error);
    res.status(500).json({ error: 'Error creating sitter profile' });
  }
});

// Update a specific sitter profile by ID
router.put('/:id', async (req, res) => {
  try {
  const { id } = req.params;
  const { bio, experience, nightly_rate } = req.body;
  const query =
  'UPDATE pet_sitters SET bio = $1, experience = $2, nightly_rate = $3 WHERE id = $4 RETURNING *';
  const values = [bio, experience, nightly_rate];
  const result = await db.query(query, values);
  if (result.rows.length === 0) {
  res.status(404).json({ error: 'Sitter profile not found' });
  } else {
  res.json(result.rows[0]);
  }
  } catch (error) {
  console.error('Error updating sitter profile:', error);
  res.status(500).json({ error: 'Error updating sitter profile' });
  }
});
  
// Delete a specific sitter profile by ID
router.delete('/:id', async (req, res) => {
  try {
  const { id } = req.params;
  const query = 'DELETE FROM sitters WHERE id = $1 RETURNING *';
  const values = [id];
  const result = await db.query(query, values);
  if (result.rows.length === 0) {
  res.status(404).json({ error: 'Sitter profile not found' });
  } else {
  res.json({ message: 'Sitter profile deleted successfully' });
  }
  } catch (error) {
  console.error('Error deleting sitter profile:', error);
  res.status(500).json({ error: 'Error deleting sitter profile' });
  }
});



// Endpoint to set the availability for a pet sitter
router.post('/:id/availability', async (req, res) => {
  const sitterId = req.params.id;
  const availability = req.body.availability; // An array of available days

  try {
    // Save the availability in the database for the specified pet sitter
    const query = 'UPDATE pet_sitters SET monday_available=$2, tuesday_available=$3, wednesday_available=$4, thursday_available=$5, friday_available=$6, saturday_available=$7, sunday_available=$8 WHERE id=$1';
    const values = [
      sitterId,
      availability.includes('Monday'),
      availability.includes('Tuesday'),
      availability.includes('Wednesday'),
      availability.includes('Thursday'),
      availability.includes('Friday'),
      availability.includes('Saturday'),
      availability.includes('Sunday')
    ];
    await db.query(query, values);

    // Return a success message or appropriate response
    res.json({ message: 'Availability set successfully' });
  } catch (error) {
    // Handle the error gracefully
    console.error('Error setting availability:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to get the availability for a pet sitter
router.get('/:id/availability', async (req, res) => {
  const sitterId = req.params.id;

  try {
    // Fetch the availability for the specified pet sitter from the database
    const query = 'SELECT * FROM pet_sitters WHERE id=$1';
    const result = await db.query(query, [sitterId]);
    const sitter = result.rows[0];
    const availability = [];
    if (sitter.monday_available) availability.push('Monday');
    if (sitter.tuesday_available) availability.push('Tuesday');
    if (sitter.wednesday_available) availability.push('Wednesday');
    if (sitter.thursday_available) availability.push('Thursday');
    if (sitter.friday_available) availability.push('Friday');
    if (sitter.saturday_available) availability.push('Saturday');
    if (sitter.sunday_available) availability.push('Sunday');

    // Return the availability as a response
    res.json({ availability });
  } catch (error) {
    // Handle the error gracefully
    console.error('Error fetching availability:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id/nightly_rate', async (req, res) => {
  const sitterId = req.params.id;
  sitters.fetchNightlyRate(sitterId).then(data => {
    console.log(data);
    res.json({nightlyRate: data});
  })
})

router.get('/:id/booking-requests', async (req, res) => {
  const sitterId = req.params.id;
  sitters.getBookingsById(sitterId).then(data => {
    console.log(data);
    res.json({bookings: data});
  })
});

router.patch('/:id/booking-requests/:bookingId', async (req, res) => {
  try {
    const { id, bookingId } = req.params;
    const { sitterAccepted, sitterRejected } = req.body;

    // Update the booking status in the database
    const updateBookingQuery = 'UPDATE bookings SET sitter_accepted = $1, sitter_rejected = $2 WHERE id = $3';
    await db.query(updateBookingQuery, [sitterAccepted, sitterRejected, bookingId]);

    res.sendStatus(200);
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.sendStatus(500);
  }
});

router.post('/:id/bookings', async (req, res) => {
  try {
    const { petId, sitter_id, startDate, endDate, fee, isComplete } = req.body;

    // // Fetch the nightly rate from the pet_sitters table
    // const rateTotal = 'SELECT nightly_rate FROM pet_sitters WHERE id = $1';
    // const rateResult = await db.query(rateTotal, [sitterId]);
    // const nightlyRate = rateResult.rows[0].nightly_rate;

    // // Calculate the number of days requested
    // const start = new Date(startDate);
    // const end = new Date(endDate);
    // const numberOfDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    // // Calculate the fee
    // const fee = nightlyRate * numberOfDays;

    // Insert the booking request into the bookings table
    const insertBooking = `INSERT INTO bookings (pet_id, sitter_id, start_date, end_date, fee, is_complete) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    const values = [petId, sitter_id, startDate, endDate, fee, isComplete];
    const result = await db.query(insertBooking, values);

    const booking = result.rows[0];
    res.status(201).json(booking);
  } catch (error) {
    console.error('Error saving booking request:', error);
    res.status(500).json({ error: 'An error occurred while saving the booking request.' });
  }
});

module.exports = router;

