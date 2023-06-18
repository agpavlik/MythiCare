const express = require('express');
const router = express.Router();
const pets = require('../../db/queries/pets')
const db = require('../../configs/db.config');



router.get('/', (req, res) => {
  pets.getAllPets().then(data => {
    console.log(data);
    res.json({pets: data});
  })
});

// Create a new pet profile
router.post('/', async (req, res) => {
  try {
    const { photo, name, age, size, temperament, feedingInfo, activityNeeds, medicalConditions, notes } = req.body;
    const query =
      'INSERT INTO pets (profile_photo, name, age, size, temperament, feeding_instructions, activity_needs, medical_conditions, other_notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
    const values = [photo, name, age, size, temperament, feedingInfo, activityNeeds, medicalConditions, notes];
    const result = await db.query(query, values);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error creating pet profile:', error);
    res.status(500).json({ error: 'Error creating pet profile' });
  }
});

//get pet by ID
router.get('/:id', (req, res) => {
  try {
    const petId = req.params.id;
    pets.getPetById(petId).then(data => {
      console.log(data);
      res.json({pet: data});
    })
  } catch (error) {
    console.error('Error retrieving pet profile:', error);
    res.status(500).json({ error: 'Error retrieving pet profile' });
  }
});

// Update a specific pet profile by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { photo, name, age, size, temperament, feedingInfo, activityNeeds, medicalConditions, notes } = req.body;
    const query =
      'UPDATE pets SET profile_photo = $1, name = $2, age = $3, size = $4, temperament = $5, feeding_instructions = $6, activity_needs = $7, medical_conditions = $8, other_notes = $9 WHERE id = $10 RETURNING *';
    const values = [photo, name, age, size, temperament, feedingInfo, activityNeeds, medicalConditions, notes, id];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Pet profile not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error updating pet profile:', error);
    res.status(500).json({ error: 'Error updating pet profile' });
  }
});

// Delete a specific pet profile by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'DELETE FROM pets WHERE id = $1 RETURNING *';
    const values = [id];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Pet profile not found' });
    } else {
      res.json({ message: 'Pet profile deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting pet profile:', error);
    res.status(500).json({ error: 'Error deleting pet profile' });
  }
});

router.get('/:id/bookings', (req, res) => {
  const petId = req.params.id;
  pets.getPetBookingById(petId).then(data => {
    console.log(data);
    res.json({bookings: data});
  })
})



module.exports = router;