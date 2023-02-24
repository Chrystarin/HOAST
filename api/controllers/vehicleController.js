const User = require('../models/User');
const Vehicle = require('../models/Vehicle');
const { UserNotFoundError, NotFoundError } = require('../helpers/errors');

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

	res.status(201).json({
		message: 'Vehicle added'
	});
};

const getVehicle = async (req, res, next) => {
	const { plateNumber } = req.body;

	try {
		const vehicle = await Vehicle.findOne({ plateNumber })
			.populate('owner', 'userId')
			.exec();
		if (!vehicle) throw new NotFoundError('Vehicle');

		res.status(200).json(vehicle);
	} catch (error) {
		next(error);
	}
};

const updateVehicleColor = async (req, res, next) => {
	const { plateNumber, color } = req.body;

	try {
		const vehicle = await Vehicle.findOne({ plateNumber });
		if (!vehicle) throw new NotFoundError('Vehicle');

		vehicle.color = color;
		await vehicle.save();

		res.status(200).json({ message: 'Vehicle color updated' });
	} catch (error) {
		next(error);
	}
};

const deleteVehicle = async (req, res, next) => {
	const { plateNumber, status } = req.body;

	try {
		const vehicle = await Vehicle.findOne({ plateNumber });
		if (!vehicle) throw new NotFoundError('Vehicle');

		vehicle.status = status;
		vehicle.save();

		res.status(200).json({ message: 'Vehicle deleted' });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	addVehicle,
	getVehicle,
	updateVehicleColor,
	deleteVehicle
}