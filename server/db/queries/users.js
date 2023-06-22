const db = require('../../configs/db.config');

const getAllUsers = () => {
	return db.query(`
		SELECT * 
		FROM users;`).then(data => {
		return data.rows;
	})
}

const getUserByEmail = id => {
	return db.query(`
    SELECT users.first_name, users.last_name, users.profile_photo AS user_photo, phone, email 
    FROM users
    WHERE users.id = $1;`, [id]).then(data => {
		return data.rows;
	})
}

const getPetsByUser = owner_id => {
  return db.query(`
    SELECT pets.profile_photo AS pet_photo, pets.name, pets.id AS pet_id
    FROM pets
    WHERE owner_id = $1`, [owner_id]).then(data => {
      return data.rows;
    })
  }
module.exports = {getAllUsers, getUserByEmail, getPetsByUser}
