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
  const { photo, name, age, size, temperament, feedingInfo, activityNeeds, medicalConditions, notes } = req.body;
  const userId = req.user;
  console.log(userId);

  const ownerQuery = 'SELECT id FROM pet_owners WHERE user_id = $1';
  const ownerValues = [userId];

  db.query(ownerQuery, ownerValues)
    .then(ownerResult => {
      if (ownerResult.rows.length > 0) {
        // User already has an entry in the pet_owners table
        const ownerId = ownerResult.rows[0].id;

        const petQuery = 'INSERT INTO pets (profile_photo, name, age, size, temperament, medical_conditions, feeding_instructions, activity_needs, other_notes, owner_id, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *';
        const petValues = [photo, name, age, size, temperament, feedingInfo, activityNeeds, medicalConditions, notes, ownerId, userId];

        return db.query(petQuery, petValues);
      } else {
        // User is adding their first pet, create a new entry in the pet_owners table
        const petOwnerQuery = 'INSERT INTO pet_owners (user_id) VALUES ($1) RETURNING id';
        const petOwnerValues = [userId];

        return db.query(petOwnerQuery, petOwnerValues)
          .then(petOwnerResult => {
            const ownerId = petOwnerResult.rows[0].id;

            const petQuery = 'INSERT INTO pets (profile_photo, name, age, size, temperament, medical_conditions, feeding_instructions, activity_needs, other_notes, owner_id, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *';
            const petValues = [photo, name, age, size, temperament, feedingInfo, activityNeeds, medicalConditions, notes, ownerId, userId];

            return db.query(petQuery, petValues);
          });
      }
    })
    .then(petResult => {
      const createdPet = petResult.rows[0];
      res.json(createdPet);
    })
    .catch(error => {
      console.error('Error adding pet:', error);
      res.status(500).json({ error: 'Failed to add pet' });
    });
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
    const result = await db.query(query, values);
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
    const result = await db.query(query, values);
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