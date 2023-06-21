const db = require('../../configs/db.config');

const getAllSitters = () => {
	return db.query(`
		SELECT * 
		FROM pet_sitters 
		JOIN users ON users.id = user_id
		JOIN reviews ON pet_sitters.id = sitter_id;`).then(data => {
		return data.rows;
	})
}

const getSitterById = id => {
	return db.query("SELECT * FROM pet_sitters JOIN users ON users.id = user_id WHERE pet_sitters.id = $1;", [id]).then(data => {
		return data.rows;
	})
}

const fetchNightlyRate = id => {
	return db.query("SELECT nightly_rate FROM pet_sitters WHERE pet_sitters.id = $1;", [id]).then(data => {
		return data.rows;
	})
}

const getBookingsById = id => {
	return db.query(`
		SELECT * 
		FROM bookings 
		JOIN pet_sitters ON sitter_id = pet_sitters.id
		JOIN pets ON pets.id = pet_id
		JOIN pet_owners ON pets.owner_id = pet_owners.id
		WHERE pet_sitters.id = $1;`, [id]).then(data => {
		return data.rows;
	})
}

const updateAvailability = id => {
	return db.query(`
	UPDATE pet_sitters 
	SET 
		monday_available = $1,
		tuesday_available = $2,
		wednesday_available = $3,
		thursday_available = $4,
		friday_available = $5,
		saturday_available = $6,
		sunday_available = $7
	WHERE id = $8;`, [id]).then(data => {
		return data.rows;
	})
}

const fetchAvailability = id => {
	return db.query(`
	SELECT 
	monday_available,
	tuesday_available,
	wednesday_available,
	thursday_available,
	friday_available,
	saturday_available,
	sunday_available
FROM pet_sitters
WHERE id = $1;`, [id]).then(data => {
	return data.rows;
	})
}



module.exports = {getAllSitters, getSitterById, updateAvailability, fetchAvailability, fetchNightlyRate, getBookingsById}
