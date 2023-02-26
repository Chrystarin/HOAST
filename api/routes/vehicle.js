const router = require('express').Router();
const {
	addVehicle,
	getVehicles,
	updateVehicleColor,
	deleteVehicle
} = require('../controllers/vehicleController');

/**
 * plateNumber
 * brand
 * model
 * type
 * color
 */
router.post('/add', addVehicle);

/**
 * case 1: (Admin, Guard)
 *     hoaId
 *     userId
 *     plateNumber - optional
 * case 2:
 *     plateNumber - optional
 */
router.get('/', getVehicles);

/**
 * plateNumber
 * color
 */
router.patch('/', updateVehicleColor);

/**
 * plateNumber
 */
router.delete('/', deleteVehicle);

module.exports = router;
