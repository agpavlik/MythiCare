const express = require('express');
const router = express.Router();
// const sitters = require('../../db/queries/sitters')
const db = require('../../configs/db.config');

router.get('/user', (req, res) => {
  const userId = req.session.user_id;
  res.json({ user_id: userId });
});

module.exports = router;
