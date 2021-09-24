const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const Comment = require('../models/Comment')

const MovieService = require('../services/MovieService')

// @desc    Get all movies
// @route   GET /api/v1/movies
// @access  Public
exports.getMovies = asyncHandler(async (req, res, next) => {
	const movies = await MovieService.getMovies()

	let data = []

	for (const movie of movies.data.results) {
		let [[{ total }]] = await Comment.countsByMovies(movie.episode_id)
		data.push({
			title: movie.title,
			opening_crawl: movie.opening_crawl,
			release_date: movie.release_date,
			episode_id: movie.episode_id,
			commentsCount: total,
		})
	}

	movies.data.results = data

	res.status(200).json(movies.data)
})

// @desc    Get single movie
// @route   GET /api/v1/movies/:id
// @access  Public
exports.getMovie = asyncHandler(async (req, res, next) => {
	let movie = await MovieService.getMovie(req.params.id)

	if (!movie.data)
		return next(new ErrorResponse(`No movie with that id of ${req.params.id}`))

	const [[{ total }]] = await Comment.countsByMovies(movie.data.episode_id)

	let data = {
		title: movie.data.title,
		opening_crawl: movie.data.opening_crawl,
		release_date: movie.data.release_date,
		episode_id: movie.data.episode_id,
		commentsCount: total,
	}

	res.status(200).json({ success: true, data: data })
})
