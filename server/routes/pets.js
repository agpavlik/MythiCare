const express = require('express');
const router = express.Router();
const pets = require('../db/queries/pets')
const db = require('../configs/db.config');



router.get('/', (req, res) => {
  pets.getAllPets().then(data => {
    console.log(data);
    res.json({pets: data});
  })
});

router.get('/:id', (req, res) => {
  const petId = req.params.id;
  pets.getPetById(petId).then(data => {
    console.log(data);
    res.json({pet: data});
  })
});

router.get('/:id/bookings', (req, res) => {
  const petId = req.params.id;
  pets.getPetBookingById(petId).then(data => {
    console.log(data);
    res.json({bookings: data});
  })
})



module.exports = router;