const { checkString } = require('../helpers/validData');
const { genHoaId } = require('../helpers/generateId');
const HOA = require('../models/HOA');
const User = require('../models/User');
const {
	UserNotFoundError,
	HOANotFoundError,
	GuardNotFoundError
} = require('../helpers/errors');

const registerHoa = async (req, res, next) => {
	const {
		name,
		address: { street, barangay, city, province }
	} = req.body;
	const { _id } = req.user;

	try {
		// Validate strings
		checkString(name, 'Name');
		checkString(street, 'Street');
		checkString(barangay, 'Barangay');
		checkString(city, 'City');
		checkString(province, 'Province');

		// Create HOA
		const hoa = await HOA.create({
			hoaId: genHoaId(),
			name,
			address: { street, barangay, city, province },
			admin: _id
		});

		res.status(201).json({
			message: 'HOA created',
			hoaId: hoa.hoaId
		});
	} catch (error) {
		next(error);
	}
};

const addGuard = async (req, res, next) => {
	const { userId, hoaId } = req.body;

	try {
		// Validate strings
		checkString(userId, 'User ID');
		checkString(hoaId, 'HOA ID');

		// Find user (to be guard)
		const guard = await User.findOne({ userId });
		if (!guard) throw new UserNotFoundError();

		// Find HOA
		const hoa = await HOA.findOne({ hoaId });
		if (!hoa) throw new HOANotFoundError();

		// Add guard to HOA
		hoa.guards.push({ guard: guard._id });
		hoa.save();

		res.status(201).json({ message: 'Guard added' });
	} catch (error) {
		next(error);
	}
};

const updateGuardStatus = async (req, res, next) => {
	const { status, hoaId, guardId } = req.body;

	try {
		checkString(status, 'Status');
		checkString(hoaId, 'HOA ID');
		checkString(guardId, 'Guard ID');

		// Find guard (to be guard)
		const userGuard = await User.findOne({ userId: guardId });
		if (!userGuard) throw new UserNotFoundError();

		// Find HOA
		const hoa = await HOA.findOne({ hoaId });
		if (!hoa) throw new HOANotFoundError();

		// Check if guard is existing in hoa
		const guard = await hoa.getGuard(guardId);
		if (!guard) throw new GuardNotFoundError();

		// Update status
		guard.status = status;
		await hoa.save();

		res.status(200).json({
			message: 'Updated guard status',
			guardId: guard.userId,
			status
		});
	} catch (error) {
		next(error);
	}
};

const getGuard = async (req, res, next) => {
	const { hoaId, guardId } = req.body;

	try {
		// Validate inputs
		checkString(hoaId, 'HOA ID');
		checkString(guardId, 'Guard ID');

		// Find if guardId is valid
		const guardUser = await User.findOne({ userId: guardId });
		if (!guardUser) throw new UserNotFoundError();

		// Find HOA
		const hoa = await HOA.findOne({ hoaId });
		if (!hoa) throw new HOANotFoundError();

		// Find guard
		const guard = await hoa.getGuard(guardId);
		if (!guard) throw new GuardNotFoundError();

		res.status(200).json(guard);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	registerHoa,
	addGuard,
	updateGuardStatus,
	getGuard
};
