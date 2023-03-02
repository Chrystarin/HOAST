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
router.post('/', addVehicle);

/**
 * [ADMIN, GUARD, USER]
 * 
 * case ADMIN/GUARD:
 *     hoaId
 *     plateNumber - optional
 * case USER:
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
