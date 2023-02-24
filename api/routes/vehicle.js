const router = require('express').Router();
const {
	addVehicle,
	getVehicle,
	updateVehicleColor,
	deleteVehicle
} = require('../controllers/vehicleController');

router.post('/add', addVehicle);
router.get('/:platenumber', getVehicle);
router.patch('/:plateNumber', updateVehicleColor);
router.delete('/:plateNumber', deleteVehicle);

module.exports = router;