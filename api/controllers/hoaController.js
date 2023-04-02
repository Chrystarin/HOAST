const HOA = require('../models/HOA');
const User = require('../models/User');
const Request = require('../models/Request');

const {
	UserNotFoundError,
	HOANotFoundError,
	GuardNotFoundError
} = require('../helpers/errors');
const { checkString, checkNumber } = require('../helpers/validData');
const { genHoaId, genRequestId } = require('../helpers/generateId');

const registerHoa = async (req, res, next) => {
	const { name, street, barangay, city, province } = req.body;

	// Validate strings
	checkString(name, 'HOA Name');
	checkString(street, 'Street');
	checkString(barangay, 'Barangay');
	checkString(city, 'City');
	checkString(province, 'Province');

	// Create HOA
	const hoa = await HOA.create({
		hoaId: genHoaId(),
		name,
		address: { street, barangay, city, province },
		admin: req.user.id
	});

	res.status(201).json({ message: 'HOA created', hoaId: hoa.hoaId });
};

const getHoas = async (req, res, next) => {
	const { hoaId } = req.query;

	// Validate input
	checkString(hoaId, 'HOA ID', true);

	// Find hoas
	const hoas = await HOA.find(hoaId ? { hoaId } : {});

	res.json(hoas);
};

const joinHoa = async (req, res, next) => {
	const { hoaId, name, number, street, phase } = req.body;

	checkString(hoaId, 'HOA ID');
	checkString(name, 'Home Name');
	checkNumber(number, 'Home Number');
	checkString(street, 'Street');
	checkString(phase, 'Phase', true);

	// Find HOA
	const hoa = await HOA.findOne({ hoaId });
	if (!hoa) throw new HOANotFoundError();

	// Create request
	const request = await Request.create({
		requestId: genRequestId(),
		hoa: hoa._id,
		requestor: req.user.user._id,
		details: { name, number, street, phase }
	});

	res.status(201).json({
		message: 'Join request created',
		requestId: request.requestId
	});
};

const addGuard = async (req, res, next) => {
	const { userId } = req.body;

	// Validate input
	checkString(userId, 'User ID');

	// Find user (to be guard)
	const user = await User.findOne({ userId });
	if (!user) throw new UserNotFoundError();

	// Get HOA
	const { hoa } = req.user;

	// Add guard to HOA
	hoa.guards.push({ guard: user._id });
	await hoa.save();

	res.status(201).json({ message: 'Guard added' });
};

const retireGuard = async (req, res, next) => {
	const { guardId } = req.body;

	// Validate input
	checkString(guardId, 'Guard ID');

	// Get HOA
	const { hoa } = req.user;

	// Find the active guard
	const guard = hoa.guards.find(
		({ user: { userId }, status }) =>
			userId === guardId && status === 'active'
	);
	if (!guard) throw new GuardNotFoundError();

	// Update status of guard
	guard.status = 'retired';
	await hoa.save();

	res.status(200).json({
		message: 'Guard retired',
		guardId: guard.user.userId
	});
};

const getGuards = async (req, res, next) => {
	const { guardId } = req.query;

	checkString(guardId, 'Guard ID', true);

	// Get the guards
	let guards = req.user.hoa.guards;

	// Find guard if guardId is given
	if (guardId)
		guards = req.user.hoa.guards.find(
			({ user: { userId } }) => userId === guardId
		);

	res.json(guards);
};

const createRequest = async (req, res, next) => {};

const processRequest = async (req, res, next) => {};

module.exports = {
	registerHoa,
	getHoas,
	joinHoa,
	addGuard,
	retireGuard,
	getGuards,
	createRequest,
	processRequest
};
