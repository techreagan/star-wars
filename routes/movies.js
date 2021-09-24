const express = require('express')
const {
	getMovies,
	// getComment,
	// getCommentsCount,
	// createComment,
	// updateComment,
	// deleteComment,
} = require('../controllers/movies')

const advancedResults = require('../middleware/advancedResults')
const Comment = require('../models/Comment')

const router = express.Router()

// router.route('/').get(advancedResults(Comment), getComments).post(createComment)

// router.route('/count').get(getCommentsCount)

// router.route('/:id').get(getComment).put(updateComment).delete(deleteComment)

router.route('/').get(getMovies)

module.exports = router
