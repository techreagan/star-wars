const Api = require('./Api')
const baseURL = '/films/'

exports.getMovies = () => {
	return Api().get(baseURL)
}

exports.getMovie = (id) => {
	return Api().get(baseURL + id)
}
