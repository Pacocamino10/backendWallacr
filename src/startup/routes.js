require('express-async-errors')
const { json } = require('express')
const morgan = require('morgan')
const cors = require('cors')

const errors = require('../middlewares/errors')
const cars = require('../routes/cars')
const users = require('../routes/users')

module.exports = function (app) {
	app.use(cors())
	app.use(json())
	app.use(morgan('dev'))

	app.use('/api/cars', cars)
	app.use('/users', users)

	// health check endpoint
	app.get('/ping', async (req, res) => {
		res.status(500).send('pronto volvemos')
	})

	app.use(errors)
}
