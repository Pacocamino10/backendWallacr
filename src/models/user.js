const mongoose = require('mongoose')
const config = require('config')

const { pick } = require('lodash')

const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	isAdmin: Boolean,
})

userSchema.methods.generateJWT = function () {
	return jwt.sign(
		pick(this, ['username', '_id', 'isAdmin']),
		config.get('privateKeyJWT_notes')
	)
}

const User = mongoose.model('User', userSchema)

module.exports = User
