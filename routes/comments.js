const express = require('express')
const {
	getComments,
	getComment,
	getCommentsCount,
	createComment,
	updateComment,
	deleteComment,
} = require('../controllers/comments')

const advancedResults = require('../middleware/advancedResults')
const Comment = require('../models/Comment')

const router = express.Router()

router.route('/').get(advancedResults(Comment), getComments).post(createComment)

router.route('/count').get(getCommentsCount)

router.route('/:id').get(getComment).put(updateComment).delete(deleteComment)

module.exports = router
