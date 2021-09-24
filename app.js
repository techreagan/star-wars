const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const cors = require('cors')

const errorHandler = require('./middleware/error')

dotenv.config({ path: './config/.env' })

const DBConnection = require('./config/db')

// const authRoutes = require('./routes/auth')
// const userRoutes = require('./routes/users')
const commentRoutes = require('./routes/comments')
const moviesRoutes = require('./routes/movies')

const app = express()

app.use(express.json())

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

// Set security headers
app.use(helmet())

// Prevent XSS attacks
app.use(xss())

// Enable CORS
app.use(cors())

// Rate limiting
const limiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 mins
	max: 100, // 100 request per 10 mins
})

app.use(limiter)

// Prevent http param pollution
app.use(hpp())

const versionOne = (routeName) => `/api/v1/${routeName}`

// app.use(versionOne('auth'), authRoutes)
// app.use(versionOne('users'), userRoutes)
app.use(versionOne('comments'), commentRoutes)
app.use(versionOne('movies'), moviesRoutes)

app.use(errorHandler)

const PORT = process.env.PORT

const server = app.listen(PORT, () => {
	console.log(
		`We are live on ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
	)
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
	console.log(`Error: ${err.message}`.red)
	// Close server & exit process
	server.close(() => process.exit(1))
})
