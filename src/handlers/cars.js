const Car = require('../models/car')
const User = require('../models/user')

const validateInputs = require('../utils/validateInputs')

const getAllCars = async (req, res) => {
	const cars = await Car.find().limit(400).exec()

	res.json(cars)
}

const getCarById = async (req, res) => {
	const { carId } = req.params

	validateInputs(req, res)

	const car = await Car.findById(carId).exec()

	if (!car) return res.status(404).send('Car no encontrada')

	res.json(car)
}

const createCar = async (req, res) => {
	validateInputs(req, res)

	const newCar = await Car.create({ ...req.body })

	res.json(newCar)
}

const updateCar = async (req, res) => {
	const { carId } = req.params

	validateInputs(req, res)

	const updatedCar = await Car.findByIdAndUpdate(
		carId,
		{ ...req.body },
		{ new: true }
	)

	res.json(updatedCar)
}

const deleteCar = async (req, res) => {
	const { carId } = req.params

	const deletedCar = await Car.findByIdAndDelete(carId)

	if (!deletedCar) res.status(404).send('No existe el Car seleccionado')

	res.json(deletedCar)
}

module.exports = {
	getAllCars,
	getCarById,
	createCar,
	updateCar,
	deleteCar,
}
