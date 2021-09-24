const axios = require('axios')

module.exports = () => {
	const axiosInstance = axios.create({
		baseURL: `${process.env.STARWARS_API}`,
	})

	return axiosInstance
}
