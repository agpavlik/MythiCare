const express = require('express');
const router = express.Router();
const sitters = require('../db/queries/sitters')


router.get('/', (req, res) => {
  sitters.getAllSitters().then(data => {
    console.log(data);
    res.json({sitters: data});
  })
});

router.get('/:id', (req, res) => {
  const sitterId = req.params.id;
  sitters.getSitterById(sitterId).then(data => {
    console.log(data);
    res.json({sitter: data});
  })
});

module.exports = router;
