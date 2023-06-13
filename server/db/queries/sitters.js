const db = require('../../configs/db.config');

const getAllSitters = () => {
	return db.query("SELECT * FROM pet_sitters JOIN users ON users.id = user_id;").then(data => {
		return data.rows;
	})
}

const getSitterById = id => {
	return db.query("SELECT * FROM pet_sitters WHERE id = $1;", [id]).then(data => {
		return data.rows;
	})
}

module.exports = {getAllSitters, getSitterById}
