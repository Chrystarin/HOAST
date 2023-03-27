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
	const { hoaId, plateNumber, homeId } = req.query;

	try {
		checkString(plateNumber, 'Plate Number', true);

		let vehicles;

		console.log(plateNumber)

		if (hoaId) {
			checkString(hoaId, 'HOA ID');

			// Find HOA
			const hoa = await HOA.findOne({ hoaId });
			if (!hoa) throw new HOANotFoundError();

			if (plateNumber) {
				// Find vehicle
				vehicles = await Vehicle.findOne({ plateNumber });
				if (!vehicles) throw new NotFoundError('Vehicle');

				// Check if owner of vehicle is resident of hoa
				const home = await Home.findOne({
					hoa: hoa._id,
					'residents.user': vehicles.owner
				});
				if (!home)
					throw new Error('Owner of vehicle not resident of hoa');
			} else {
				// Get the homes within the hoa
				const homes = await Home.find({ hoa: hoa._id }).populate({
					path: 'residents.user',
					populate: { path: 'homes', model: 'Home' }
				});

				// Extract the vehicles owned by the residents of each home
				vehicles = homes.reduce(
					(prevHome, { residents }) => [
						...prevHome,
						...residents.reduce(
							(prevUser, { vehicles }) => [
								...prevUser,
								...vehicles
							],
							[]
						)
					],
					[]
				);
			}
		} else {
			if (plateNumber) {
				// Find vehicle
				vehicles = await Vehicle.findOne({ plateNumber });
				if (!vehicles) throw new NotFoundError('Vehicle');
			} 
			else{
				({ vehicles } = await User.findById(req.user._id).populate(
					'vehicles'
				));
			}
			
		}

		res.status(200).json(vehicles);
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
