
const db = require('../db')

exports.getPets = async (req, res) => {
  try {
    const query = 'SELECT * FROM pets';
    const result = await db.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving pet profiles:', error);
    res.status(500).json({ error: 'Error retrieving pet profiles' });
  }
}

exports.createPets = async (req, res) => {
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
}
