const { Router } = require('express')
const { getPets, createPets } = require('../controllers/pets')

const router = Router()

router.get('/', getPets)
router.post('/', createPets)

module.exports = router
