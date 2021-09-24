const Api = require('./Api')
const baseURL = '/people'

exports.getCharacters = (query) => {
	return Api().get(baseURL + query)
}
