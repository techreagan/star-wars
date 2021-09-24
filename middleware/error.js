const errorHandler = (err, req, res, next) => {
	let error = {
		...err,
	}

	error.message = err.message

	// console.log(err.stack.red);
	console.log(err)

	res.status(error.statusCode || 500).json({
		success: false,
		error: error.messageWithField || error.message || 'Server Error',
	})
}

module.exports = errorHandler
