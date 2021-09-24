const express = require('express')
const { getCharacters, getCharacter } = require('../controllers/characters')

const router = express.Router()

router.route('/').get(getCharacters)

module.exports = router
