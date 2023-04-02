const HOA = require('../models/HOA');
const Request = require('../models/Request');
const Home = require('../models/Home');

const { checkString, checkNumber } = require('../helpers/validData');
const { HOANotFoundError, RequestNotFoundError } = require('../helpers/errors');
const { genRequestId, genHomeId } = require('../helpers/generateId');

const getRequests = async (req, res, next) => {
	const { requestId } = req.query;
	const { type, role } = req.user;

	// Validate input
	checkString(requestId, 'Request ID', true);

	let requests;

	if (type === 'user') {
		const { user } = req.user;
		requests = await Request.find({ requestor: user._id });
	}

	if (role === 'admin') {
		const { hoa } = req.user;
		requests = await Request.find({ hoa: hoa._id });
	}

	req.json(requests);
};

const createRequest = async (req, res, next) => {
	const { hoaId, homeName, homeNumber, street, phase } = req.body;
	const { user } = req.user;

	checkString(hoaId, 'HOA ID');
	checkString(homeName, 'Home Name');
	checkNumber(homeNumber, 'Home Number');
	checkString(street, 'Street');
	checkString(phase, 'Phase', true);

	// Find HOA
	const hoa = await HOA.findOne({ hoaId });
	if (!hoa) throw new HOANotFoundError();

	const request = await Request.create({
		requestId: genRequestId(),
		hoa: hoa._id,
		requestor: user._id,
		details: { name: homeName, number: homeNumber, street, phase }
	});

	res.status(201).json({
		message: 'Request created',
		requestId: request.requestId
	});
};

const processRequest = async (req, res, next) => {
	const { requestId, status } = req.body;
	const { hoa } = req.user;

	// Validate input
	checkString(requestId, 'Request ID');
	checkString(status, 'Request Status');

	// Find request
	const request = await Request.findOne({
		requestId,
		hoa: hoa._id,
		status: 'pending'
	});
	if (!request) throw new RequestNotFoundError();

	// Response details
	let resStatus = 200;
	const resMessage = { message: 'Request rejected' };

	// Process request if approved
	if (status === 'approved') {
		const { name, ...address } = request.details;

		// Create home
		const home = await Home.create({
			homeId: genHomeId(),
			name,
			owner: request.requestor,
			hoa: hoa._id,
			address,
			residents: [{ user: request.requestor }]
		});

		resStatus = 201;
		resMessage = { message: 'Home created', homeId: home.homeId };
	}

	// Update request
	request.status = status;
	await request.save();

	res.status(resStatus).json(resMessage);
};

module.exports = {
	createRequest,
	processRequest,
	getRequests
};
