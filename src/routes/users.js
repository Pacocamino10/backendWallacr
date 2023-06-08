const { Router } = require('express')

const bcrypt = require('bcrypt')
const User = require('../models/user')

const router = Router()

router.post('/signup', async (req, res, next) => {
	const { password: passwordPlainText, ...rest } = req.body

	const salt = await bcrypt.genSalt(10)
	const password = await bcrypt.hash(passwordPlainText, salt)

	try {
		const newUser = await User.create({ password, ...rest })

		const token = newUser.generateJWT()
		res.setHeader('access-control-expose-headers', 'x-auth-token')
		res.setHeader('x-auth-token', token).json(newUser)
	} catch (err) {
		if (err.keyPattern.username) {
			res.status(400).send('Usuario ya registrado')
		}
	}
})

router.post('/signin', async (req, res) => {
	const { password: passwordPlainText, username } = req.body

	const user = await User.findOne({ username })
	if (!user) res.status(404).send('Username o Password incorrecto')

	const isUser = await bcrypt.compare(passwordPlainText, user.password)
	if (!isUser) res.status(404).send('Username o Password incorrecto')

	const token = user.generateJWT()
	res.setHeader('access-control-expose-headers', 'x-auth-token')
	res.setHeader('x-auth-token', token).send('Success')
})

module.exports = router
