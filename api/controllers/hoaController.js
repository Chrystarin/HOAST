const { checkString, checkNumber } = require('../helpers/validData');
const { genHoaId, genRequestId } = require('../helpers/generateId');

const HOA = require('../models/HOA');
const User = require('../models/User');
const Request = require('../models/Request');
const Home = require('../models/Home');
const Visitor = require('../models/Visitor');
const {
	UserNotFoundError,
	HOANotFoundError,
	GuardNotFoundError,
	InvalidAction
} = require('../helpers/errors');

const registerHoa = async (req, res, next) => {
	const {
		name,
		address: { street, barangay, city, province }
	} = req.body;

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
			admin: req.user._id
		});

		res.status(201).json({
			message: 'HOA created',
			hoaId: hoa.hoaId
		});
	} catch (error) {
		next(error);
	}
};

const getHoa = async (req, res, next) => {
    const {hoaId} = req.query
    let hoa={}
	try {
        if(hoaId) {
            hoa = await HOA.findOne({hoaId : hoaId})
        }
        else {
            hoa = await HOA.find()
        }
        res.status(200).json(hoa);
	} catch (error) {
		next(error);
	}
};

const joinHoa = async (req, res, next) => {
	const {
		hoaId,
		address: { houseName, houseNumber, street, phase }
	} = req.body;

	try {
		checkString(hoaId, 'HOA ID');
		checkString(houseName, 'Home Name');
		checkNumber(houseNumber);
		checkString(street, 'Street');
		checkString(phase, 'Phase', true);

		// Find HOA
		const hoa = await HOA.findOne({ hoaId });
		if (!hoa) throw new HOANotFoundError();

		// Check if admin of the hoa is requesting
		if (hoa.admin.equals(req.user._id)) throw new InvalidAction();

		let homeDetails = { houseName, houseNumber, street };
		if (phase) homeDetails.phase = phase;

		// Create request
		const request = await Request.create({
			requestId: genRequestId(),
			hoa: hoa._id,
			requestor: req.user._id,
			homeDetails
		});

		res.status(201).json({
			message: 'Join requested',
			requestId: request.requestId
		});
	} catch (err) {
		next(err);
	}
};

const addGuard = async (req, res, next) => {
	const { hoaId, userId } = req.body;

	try {
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
		await hoa.save();

		res.status(201).json({ message: 'Guard added' });
	} catch (error) {
		next(error);
	}
};

const updateGuardStatus = async (req, res, next) => {
	const { hoaId, status, guardId } = req.body;

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

const getGuards = async (req, res, next) => {
	const { hoaId, guardId } = req.body;

	try {
		checkString(hoaId, 'HOA ID');
		checkString(guardId, 'Guard ID', true);

		// Find HOA
		const hoa = await HOA.findOne({ hoaId }).populate(
			'guards.guard',
			'userId'
		);
		if (!hoa) throw new HOANotFoundError();

		let guards = hoa.guards;
		if (guardId) {
			// Check guard if registered
			const guard = await User.findOne({ userId: guardId });
			if (!guard) throw new UserNotFoundError();

			guards = hoa.guards.filter(
				({ guard: { userId } }) => userId === guardId
			);
		}

		res.status(200).json(guards);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	registerHoa,
    getHoa,
	joinHoa,
	addGuard,
	updateGuardStatus,
	getGuards
};
