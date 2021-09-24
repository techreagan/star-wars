const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const Comment = require('../models/Comment')

const requestIp = require('request-ip')

// @desc    Get all comments
// @route   GET /api/v1/comments
// @access  Public
exports.getComments = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.advancedResults)
})

// @desc    Get single comment
// @route   GET /api/v1/comments/:id
// @access  Public
exports.getComment = asyncHandler(async (req, res, next) => {
	const [comment] = await Comment.findById(req.params.id)

	if (!comment.length)
		return next(
			new ErrorResponse(`No comment with that id of ${req.params.id}`)
		)

	res.status(200).json({ success: true, data: comment })
})

// @desc    Get comments count
// @route   GET /api/v1/comments/moviescount
// @access  Public
exports.getCommentsCount = asyncHandler(async (req, res, next) => {
	const [[total]] = await Comment.countsByMovies()

	res.status(200).json({ success: true, data: total.total })
})

// @desc    Create comment
// @route   POST /api/v1/comments
// @access  Public
exports.createComment = asyncHandler(async (req, res, next) => {
	const { text, movieId } = req.body
	const ipAddress = requestIp.getClientIp(req)

	if (!movieId) {
		return next(new ErrorResponse('Movie id is required', 400))
	}

	if (text.length > 500) {
		return next(
			new ErrorResponse(
				"Text length can't only have maximum of 500 characters",
				400
			)
		)
	}

	let comment = new Comment(null, text, movieId, ipAddress)
	let [rows] = await comment.save()

	comment.id = rows.insertId

	res.status(201).json({ success: true, data: comment })
})

// @desc    Update comment
// @route   PUT /api/v1/comments/:id
// @access  comments
exports.updateComment = asyncHandler(async (req, res, next) => {
	const { id, text, movieId } = req.body

	if (!movieId || !id) {
		return next(new ErrorResponse('Movie id and comment id is required', 400))
	}

	if (text.length > 500) {
		return next(
			new ErrorResponse(
				"Text length can't only have maximum of 500 characters",
				400
			)
		)
	}

	let comment = new Comment(id, text, movieId)
	comment.save()

	// delete comment.id
	res.status(201).json({ success: true, data: comment })
})

// @desc    Delete comment
// @route   DELETE /api/v1/comments/:id
// @access  Public
exports.deleteComment = asyncHandler(async (req, res, next) => {
	const [comment] = await Comment.findById(req.params.id)

	if (!comment.length)
		return next(
			new ErrorResponse(`No comment with that id of ${req.params.id}`)
		)

	await Comment.deleteById(req.params.id)

	res.status(200).json({ success: true, data: {} })
})
