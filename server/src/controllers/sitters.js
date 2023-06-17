
const db = require('../db')

exports.getSitters = async (req, res) => {
  try {
    const query = 'SELECT * FROM pet_sitters';
    const result = await db.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving sitter profiles:', error);
    res.status(500
    ).json({ error: 'Error retrieving sitter profiles' });
  }
}

exports.createSitters = async (req, res) => {
  try {
    const { bio, experience, nightly_rate } = req.body;
    const query = 'INSERT INTO pet_sitters (bio, experience, nightly_rate) VALUES ($1, $2, $3) RETURNING *';

    const values = [bio, experience, nightly_rate];
    const result = await db.query(query, values);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error creating sitter profile:', error);
    res.status(500).json({ error: 'Error creating sitter profile' });
  }
}


// app.post('/api/sitters', async (req, res) => {
//   try {
//     const { name, age, experience, availability, userId } = req.body;

//     const insertSitterQuery = 'INSERT INTO pet_sitters (user_id, experience) VALUES ($1, $2) RETURNING *';
//     const insertSitterValues = [userId, experience];
//     const insertedSitter = await pool.query(insertSitterQuery, insertSitterValues);

//     const sitterId = insertedSitter.rows[0].id;

//     const updateUserQuery = 'UPDATE users SET isPetSitter = true WHERE id = $1';
//     const updateUserValues = [userId];
//     await pool.query(updateUserQuery, updateUserValues);

//     const selectQuery = 'SELECT pet_sitters.id AS sitter_id, pet_sitters.experience, users.id AS user_id, users.first_name, users.last_name, users.email, users.phone, users.city, users.country, users.profile_photo FROM pet_sitters JOIN users ON pet_sitters.user_id = users.id WHERE pet_sitters.id = $1';
//     const selectValues = [sitterId];
//     const result = await pool.query(selectQuery, selectValues);

//     res.json(result.rows[0]);
//   } catch (error) {
//     console.error('Error creating sitter profile:', error);
//     res.status(500).json({ error: 'Error creating sitter profile' });
//   }
// });