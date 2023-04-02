const router = require('express').Router();

const asyncHandler = require('../middlewares/asyncHandler');
const {
	onlyUser,
	allowEmployee,
	allowResident
} = require('../middlewares/authorization');

const { getVehicles, addVehicle } = asyncHandler(
	require('../controllers/vehicleController')
);

/**
 * Get vehicles
 *
 * plateNumber - optional [one | many]
 */
router.get('/', allowEmployee, allowResident, getVehicles);

/**
 * Add vehicle
 *
 * plateNumber
 * brand
 * model
 * type
 * color
 */
router.post('/', onlyUser, addVehicle);

module.exports = router;
