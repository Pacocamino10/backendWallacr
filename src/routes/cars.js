const { Router } = require('express')
const { body, param } = require('express-validator')
const isAuth = require('../middlewares/isAuth')
const isAdmin = require('../middlewares/isAdmin')

const {
	getAllCars,
	getCarById,
	createCar,
	updateCar,
	deleteCar,
} = require('../handlers/cars.js')

const router = Router()

const validate = {
	id: param('cardId')
		.isMongoId()
		.withMessage('Identificador del car invalido'),
	notEmptyTitle: body('title')
		.not()
		.isEmpty()
		.withMessage('Debe introducir un titulo'),
}

router.get('/', getAllCars)

router.get('/:carId', [isAuth, isAdmin], validate.id, getCarById)

router.post('/', [isAuth], validate.notEmptyTitle, createCar)
router.put(
	'/:carId',
	[isAuth, isAdmin],
	validate.id,
	validate.notEmptyTitle,
	body('completed').isBoolean().optional(),
	updateCar
)
router.delete('/:carId', [isAuth, isAdmin], deleteCar)

module.exports = router
