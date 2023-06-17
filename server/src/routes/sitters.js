const { Router } = require('express')
const { getSitters, createSitters } = require('../controllers/sitters')

const router = Router()

router.get('/', getSitters)
router.post('/', createSitters)

module.exports = router
