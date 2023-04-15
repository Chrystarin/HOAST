const {
	roles: { USER },
	types: { EMPLOYEE, RESIDENT }
} = require('../helpers/constants');
const { checkString } = require('../helpers/validData');
const { VehicleNotFoundError } = require('../helpers/errors');
const extractHomes = require('../helpers/extractHomes');

const getVehicles = async (req, res, next) => {
	const { plateNumber } = req.query;
	const { type } = req.user;

	// Validate iput
	checkString(plateNumber, 'Plate Number', true);

	let vehicles;

	if (type == USER) {
		const { user } = req.user;
		vehicles = user.vehicles;
	}

	if (RESIDENT.has(type)) {
		const { home } = req.user;

		// Get each of residents' vehicles
		vehicles = await extractHomes([home]);
	}

	if (EMPLOYEE.has(type)) {
		const { hoa } = req.user;

		// Get all vehicles of each resident of each home
		vehicles = await extractHomes({ hoa: hoa._id });
	}

	// Get specific vehicle
	if (plateNumber) {
		vehicles = vehicles.find(({ plateNumber: pn }) => plateNumber == pn);
		if (!vehicles) throw new VehicleNotFoundError();
	}
	res.json(vehicles);
};

const addVehicle = async (req, res, next) => {
	const { plateNumber, brand, model, type, color } = req.body;
	const { user } = req.user;

	checkString(plateNumber, 'Plate Number');
	checkString(brand, 'Brand');
	checkString(model, 'Model');
	checkString(type, 'Type');
	checkString(color, 'Color');

	// Create vehicle
	user.vehicles.push({ plateNumber, brand, model, type, color });
	await user.save();

	res.status(201).json({ message: 'Vehicle added' });
};

module.exports = { getVehicles, addVehicle };
