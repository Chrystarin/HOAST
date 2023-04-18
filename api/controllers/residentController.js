const User = require('../models/User');

const {
	types: { EMPLOYEE, RESIDENT }
} = require('../helpers/constants');
const {
	UserNotFoundError,
	NotFoundError,
	ForbiddenError,
	ResidentNotFoundError
} = require('../helpers/errors');
const { checkString } = require('../helpers/validData');
const extractHomes = require('../helpers/extractHomes');

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

		// Get residents for each home
		({ residents } = await extractHomes({ hoa: hoa._id }));
	}

	// Get specific resident
	if (residentId) {
		residents = residents.find(
			({ user: { userId } }) => residentId == userId
		);
		if (!residents) throw new NotFoundError('User is not resident');
	}

	res.json(residents);
};

const addResident = async (req, res, next) => {
	const { userId } = req.body;
	const { home } = req.user;

    console.log(userId)
    console.log("TEST")

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


    console.log(residentId)

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

module.exports = { getResidents, addResident, removeResident };
