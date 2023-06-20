const db = require('../../configs/db.config');

const getAllOwners = id => {
  return db.query('SELECT * from pet_owners;').then(data => {
    return data.rows;
  })
}

const getPetNameByOwner = id => {
  return db.query(`
    SELECT pets.id AS pet_id, pets.name, pet_owners.id AS owner_id
    FROM pets
    JOIN pet_owners ON pet_owners.id = owner_id
    WHERE pet_owners.id = $1;`, [id]).then(data => {
      return data.rows;
    })
}

const getPetByOwner = id => {
  return db.query(`
    SELECT *
    FROM pets
    JOIN pet_owners ON pet_owners.id = owner_id
    WHERE pet_owners.id = $1;`, [id]).then(data => {
      return data.rows;
    })
}

const getOwnerIdFromUser = id => {
  return db.query(`
    SELECT id FROM pet_owners WHERE user_id = $1;`, [id]).then(data => {
      return data.rows;
    })
}

module.exports = {getAllOwners, getPetByOwner, getPetNameByOwner, getOwnerIdFromUser}
