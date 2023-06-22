const express = require('express');
const router = express.Router();
const users = require('../../db/queries/users')
const db = require('../../configs/db.config');
const jwt = require('jsonwebtoken');



// router.get('/', async (req, res) => {
//   try {
//     users.getAllUsers().then(data => {
//       console.log(data);
//       res.json({users: data});
//   })
// } catch {
//   console.error('Error retrieving users profiles:', error);
//   res.status(500
//   ).json({ error: 'Error retrieving users profiles' });
// }
// });


// Retrieve a specific owner by ID
router.get('/', async (req, res) => {
  try {

    users.getUserByEmail(11).then(data => {
      console.log(data);
      res.json({ user: data });
    });
  } catch (error) {
    console.error('Error retrieving user profile:', error);
    res.status(500).json({ error: 'Error retrieving user profile' });
  }
});

router.get('/pets', async (req, res) => {
  try {

    users.getPetsByUser(11).then(data => {
      console.log(data);
      res.json({ pets: data });
    });
  } catch (error) {
    console.error('Error retrieving user profile:', error);
    res.status(500).json({ error: 'Error retrieving user profile' });
  }
});






module.exports = router;
