const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
	title: { type: String, required: true },
	completed: { type: Boolean, default: false },
	owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})

const Car = mongoose.model('Task', carSchema)

module.exports = Car
