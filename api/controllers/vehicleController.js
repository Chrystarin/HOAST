const Home = require('../models/Home');

const { checkString } = require('../helpers/validData');

const getVehicles = async (req, res, next) => {
	const { plateNumber } = req.query;
	const { type } = req.user;

	// Validate iput
	checkString(plateNumber, 'Plate Number', true);

	let vehicles;

	if (type === 'user') {
		const { user } = req.user;
		vehicles = user.vehicles;
	}

	if (type === 'resident') {
		const { home } = req.user;
		vehicles = home.residents.reduce(
			(arr1, { user: { vehicles: v } }) => [...arr1, ...v],
			[]
		);
	}

	if (type === 'employee') {
		const { hoa } = req.user;

		// Get all homes under hoa
		const homes = await Home.find({ hoa: hoa._id })
			.populate('residents.user')
			.exec();

		// Get all vehicles of each resident of each home
		vehicles = homes.reduce(
			(arr1, { residents }) => [
				...arr1,
				...residents.reduce(
					(arr2, { user: { vehicles: v } }) => [...arr2, ...v],
					[]
				)
			],
			[]
		);
	}

	vehicles = vehicles.filter(({ plateNumber: pn }) =>
		plateNumber ? plateNumber === pn : true
	);

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
