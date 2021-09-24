const ErrorResponse = require('../utils/errorResponse')

const errorHandler = (err, req, res, next) => {
	let error = {
		...err,
	}

	error.message = err.message

	// console.log(err.stack.red);
	console.log(err)

	// Not Found
	if (err.response.data.detail === 'Not found') {
		// const message = `Resource (${err.response.config.url}) not found`
		const message = `Resource not found`
		error = new ErrorResponse(message, 404)
	}

	res.status(error.statusCode || 500).json({
		success: false,
		error: error.messageWithField || error.message || 'Server Error',
	})
}

module.exports = errorHandler
