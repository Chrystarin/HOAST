const HOA = require('../models/HOA');
const User = require('../models/User');
const Request = require('../models/Request');

const {
	UserNotFoundError,
	HOANotFoundError,
	DuplicateEntryError,
	NotFoundError
} = require('../helpers/errors');
const { checkString, checkNumber } = require('../helpers/validData');
const { genHoaId, genRequestId } = require('../helpers/generateId');
const { checkDate } = require('../helpers/validData');

const registerHoa = async (req, res, next) => {
	const { name, street, barangay, city, province, paymentMonth, paymentDay } =
		req.body;
	const { user } = req.user;

	let date = `${paymentMonth}-${paymentDay}`;

	// Validate strings
	checkString(barangay, 'Barangay');
	checkString(city, 'City');
	checkString(name, 'HOA Name');
	checkString(province, 'Province');
	checkString(street, 'Street');
	checkDate(date, 'Payment Date');

	date = new Date(date);

	// Create HOA
	const hoa = await HOA.create({
		hoaId: genHoaId(),
		name,
		address: { street, barangay, city, province },
		admin: user._id,
		paymentDate: {
			month: date.getMonth(),
			day: date.getDate()
		}
	});

	res.status(201).json({ message: 'HOA created', hoaId: hoa.hoaId });
};

const getHoas = async (req, res, next) => {
	const { hoaId } = req.query;

	// Validate input
	checkString(hoaId, 'HOA ID', true);

	// Find hoas
	let hoas = await HOA.find();

	// Get specific hoa
	if (hoaId) {
		hoas = await HOA.findOne({ hoaId });
		if (!hoas) throw new HOANotFoundError();
	} 

	res.json(hoas);
};

const joinHoa = async (req, res, next) => {
	const { hoaId, name, number, street, phase } = req.body;
	const { user } = req.user;

	checkString(hoaId, 'HOA ID');
	checkString(name, 'Home Name');
	checkNumber(number, 'Home Number');
	checkString(street, 'Street');
	checkString(phase, 'Phase', true);

	// Find HOA
	const hoa = await HOA.findOne({ hoaId });
	if (!hoa) throw new HOANotFoundError();

	// Check if user already sent a join request
	const requestExists = await Request.exists({
		hoa: hoa._id,
		requestor: user._id,
		status: 'pending'
	});
	if (requestExists)
		throw new DuplicateEntryError('Join request already sent');

	// Create request
	const request = await Request.create({
		requestId: genRequestId(),
		hoa: hoa._id,
		requestor: user._id,
		details: { name, number, street, phase }
	});

	res.status(201).json({
		message: 'Join request created',
		requestId: request.requestId
	});
};

const addGuard = async (req, res, next) => {
	const { userId } = req.body;
	const { hoa } = req.user;

	// Validate input
	checkString(userId, 'User ID');

	// Find user (to be guard)
	const user = await User.findOne({ userId });
	if (!user) throw new UserNotFoundError();

	// Add guard to HOA
	hoa.guards.push({ guard: user._id });
	await hoa.save();

	res.status(201).json({ message: 'Guard added' });
};

const retireGuard = async (req, res, next) => {
	const { guardId } = req.body;
	const { hoa } = req.user;

	// Validate input
	checkString(guardId, 'Guard ID');

	// Find the active guard
	const guard = hoa.guards.find(
		({ user: { userId }, status }) =>
			userId == guardId && status == 'active'
	);
	if (!guard) throw new NotFoundError('Can not find active guard');

	// Update status of guard
	guard.status = 'retired';
	await hoa.save();

	res.json({ message: 'Guard retired', guardId });
};

const getGuards = async (req, res, next) => {
	const { guardId } = req.query;
	const { hoa } = req.user;

	checkString(guardId, 'Guard ID', true);

	let guards = hoa.guards;

	// Get specific guard
	if (guardId) {
		guards = hoa.guards.find(({ user: { userId } }) => userId == guardId);

		if (!guards) throw new NotFoundError('Incorrect guard id');
	}

	res.json(guards);
};

module.exports = {
	registerHoa,
	getHoas,
	joinHoa,
	addGuard,
	retireGuard,
	getGuards
};
