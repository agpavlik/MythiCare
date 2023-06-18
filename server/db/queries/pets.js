const db = require('../../configs/db.config');

const getAllPets = () => {
	return db.query("SELECT * FROM pets;").then(data => {
		return data.rows;
	})
}

const getPetById = id => {
	return db.query("SELECT * FROM pets WHERE pets.id = $1;", [id]).then(data => {
		return data.rows;
	})
}

const getPetBookingById = id => {
  return db.query(`
  SELECT 
    bookings.id AS booking_id, 
    pet_id, 
    sitter_id, 
    owner_id,
    name, 
    start_date,
    end_date,
    is_complete 
  FROM bookings JOIN pets ON pets.id = pet_id 
  WHERE pets.id = $1;`, [id]).then(data => {
		return data.rows;
	})
}

module.exports = {getAllPets, getPetById, getPetBookingById}
