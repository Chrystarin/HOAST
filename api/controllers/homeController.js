const User = require('../models/User');
const Home = require('../models/Home');

const {
	UserNotFoundError,
	ForbiddenError,
	ResidentNotFoundError,
	NotFoundError
} = require('../helpers/errors');
const {
	roles: { USER },
	types: { EMPLOYEE, RESIDENT }
} = require('../helpers/constants');
const { checkString } = require('../helpers/validData');

const getHomes = async (req, res, next) => {
	const { homeId } = req.query;
	const { type } = req.user;

	// Validate input
	checkString(homeId, 'Home ID', true);

	let homes;

	if (type == USER) {
		const { user } = req.user;
		homes = await Home.find({ owner: user._id })
			.populate('residents.user')
			.exec();
	}

	if (EMPLOYEE.has(type)) {
		const { hoa } = req.user;
		homes = await Home.find({ hoa: hoa._id })
			.populate('residents.user')
			.exec();
	}

	// Get specific home
	if (homeId) {
		homes = homes.find(({ homeId: hi }) => (homeId ? homeId == hi : true));

		if (!homes) throw new NotFoundError('Incorrect home id');
	}

	res.json(homes);
};

const getResidents = async (req, res, next) => {
	const { residentId } = req.query;
	const { type } = req.user;

	// Validate input
	checkString(residentId, 'Resident ID', true);

	let residents;

	if (RESIDENT.has(type)) {
		const { home } = req.user;
		residents = home.residents;
	}

	if (EMPLOYEE.has(type)) {
		const { hoa } = req.user;

		// Get homes under hoa
		const homes = await Home.find({ hoa: hoa._id })
			.populate('residents.user')
			.exec();

		// Get residents for each home
		residents = homes.reduce(
			(arr1, { residents: r }) => [...arr1, ...r],
			[]
		);
	}

	// Get specific resident
	if (residentId) {
		residents = residents.find(({ user: { userId } }) =>
			residentId ? residentId == userId : true
		);

		if (!residents) throw new NotFoundError('User is not resident');
	}

	res.json(residents);
};

const updateHome = async (req, res, next) => {
	const { name } = req.body;
	const { home } = req.user;

	// Update home
	home.name = name;
	await home.save();

	res.json({ message: 'Home updated' });
};

const addResident = async (req, res, next) => {
	const { userId } = req.body;
	const { home } = req.user;

	// Validate input
	checkString(userId, 'User ID');

	const user = await User.findOne({ userId });
	if (!user) throw new UserNotFoundError();

	// Add user as resident in home
	home.residents.push({ user: user._id });
	await home.save();

	res.status(201).json({ message: 'Resident added' });
};

const removeResident = async (req, res, next) => {
	const { residentId } = req.body;
	const { home, user } = req.user;

	// Validate input
	checkString(residentId, 'Resident ID');

	// Check if user is homeowner
	if (residentId === user.userId)
		throw new ForbiddenError('Owner can not be inactive');

	// Find user index
	const resident = home.residents.find(
		({ user: { userId, status } }) =>
			userId == residentId && status == 'active'
	);
	if (!resident) throw new ResidentNotFoundError();

	// Set the status of resident to inactive
	resident.status = 'inactive';
	await home.save();

	res.json({ message: 'Resident removed' });
};

module.exports = {
	getHomes,
	updateHome,
	getResidents,
	addResident,
	removeResident
};
