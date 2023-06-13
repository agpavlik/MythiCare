const express = require('express');
const router = express.Router();
const users = require('../db/queries/sitters');


router.get('/sitters', (req, res) => {
  users.getAllSitters().then(data => {
    console.log(data);
    res.json({sitters: data});
  })
});

module.exports = router;
