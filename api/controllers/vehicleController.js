const User = require('../models/User');
const Vehicle = require('../models/Vehicle');
const HOA = require('../models/HOA');
const Home = require('../models/Home');
const {
	UserNotFoundError,
	NotFoundError,
	HOANotFoundError
} = require('../helpers/errors');
const { checkString } = require('../helpers/validData');

const addVehicle = async (req, res, next) => {
	const { plateNumber, brand, model, type, color } = req.body;

	const vehicle = await Vehicle.create({
		owner: req.user._id,
		plateNumber,
		brand,
		model,
		type,
		color
	});

	await User.findByIdAndUpdate(req.user._id, {
		$push: { vehicles: vehicle._id }
	});

	res.status(201).json({ message: 'Vehicle added' });
};

const getVehicles = async (req, res, next) => {
	const { hoaId, userId, plateNumber } = req.body;

	try {
		checkString(plateNumber, 'Plate Number', true);

		let vehicleQuery = { owner: req.user._id };

		if (hoaId && userId) {
			checkString(hoaId, 'HOA ID');
			checkString(userId, 'User ID');

			// Find HOA
			const hoa = await HOA.findOne({ hoaId });
			if (!hoa) throw new HOANotFoundError();

			// Find User
			const user = await User.findOne({ userId });
			if (!user) throw new UserNotFoundError();

			// Check if user is resident within hoa
			const home = await Home.findOne({
				hoa: hoa._id,
				residents: { user: user._id, status: 'active' }
			});
			if (!home) throw new NotFoundError('Home');

			// Update owner
			vehicleQuery.owner = user._id;
		}

		if (plateNumber) vehicleQuery.plateNumber = plateNumber;

		res.status(200).json(
			await Vehicle.find(vehicleQuery).populate('owner', 'userId').exec()
		);
	} catch (error) {
		next(error);
	}
};

const updateVehicleColor = async (req, res, next) => {
	const { plateNumber, color } = req.body;

	try {
		// Find vehicle
		const vehicle = await Vehicle.findOne({
			plateNumber,
			owner: req.user._id
		});
		if (!vehicle) throw new NotFoundError('Vehicle');

		vehicle.color = color;
		await vehicle.save();

		res.status(200).json({ message: 'Vehicle color updated' });
	} catch (error) {
		next(error);
	}
};

const deleteVehicle = async (req, res, next) => {
	const { plateNumber } = req.body;

	try {
		const vehicle = await Vehicle.findOne({
			plateNumber,
			owner: req.user._id
		});
		if (!vehicle) throw new NotFoundError('Vehicle');

		vehicle.status = 'inactive';
		await vehicle.save();

		res.status(200).json({ message: 'Vehicle deleted' });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	addVehicle,
	getVehicles,
	updateVehicleColor,
	deleteVehicle
};
