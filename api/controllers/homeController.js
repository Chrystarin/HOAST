const User = require('../models/User');
const Home = require('../models/Home');

const { UserNotFoundError, ForbiddenError } = require('../helpers/errors');
const { checkString } = require('../helpers/validData');

const getHomes = async (req, res, next) => {
	const { homeId } = req.query;
	const { type } = req.user;

	// Validate input
	checkString(homeId, 'Home ID', true);

	let homes;

	if (type === 'user') {
		const { user } = req.user;
		homes = await Home.find({ owner: user._id });
	}

	if (type === 'resident') {
		const { user } = req.user;
		homes = await Home.find({ 'residents.user': user._id });
	}

	if (type === 'employee') {
		const { hoa } = req.user;
		homes = await Home.find({ hoa: hoa._id });
	}

	// Filter homes with homeId
	homes = homes.filter(({ homeId: hi }) => (homeId ? homeId === hi : true));

	req.json(homes);
};

const getResidents = async (req, res, next) => {
	const { residentId } = req.query;
	const { type } = req.user;

	// Validate input
	checkString(residentId, 'Resident ID', true);

	let residents;

	if (type === 'resident') {
		const { home } = req.user;
		residents = home.residents;
	}

	if (type === 'employee') {
		const { hoa } = req.user;

		// Get homes under hoa
		const homes = await Home.find({ hoa: hoa._id });

		// Get residents for each home
		residents = homes.reduce(
			(arr1, { residents: r }) => [...arr1, ...r],
			[]
		);
	}

	// Filter residents with residentId
	residents = residents.filter(({ residentId: ri }) =>
		residentId ? residentId === ri : true
	);

	res.json(residents);
};

const updateHome = async (req, res, next) => {
	const { name } = req.body;

	// Get home from req.user
	const { home } = req.user;

	// Update home
	home.name = name;
	await home.save();

	res.status(200).json({ message: 'Home updated' });
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
	const { userId } = req.body;
	const { home, type } = req.user;

	// Validate input
	checkString(userId, 'User ID');

	// Check if user is admin
	if (type === 'admin')
		throw new ForbiddenError("Admin of Home can't be inactive");

	// Find user index
	const user = home.residents.find(
		({ user: { userId: id, status } }) =>
			id === userId && status === 'active'
	);
	if (!user) throw new UserNotFoundError();

	// Set the status of resident to inactive
	user.status = 'inactive';
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
