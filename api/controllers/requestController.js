const HOA = require('../models/HOA');
const Request = require('../models/Request');
const Home = require('../models/Home');

const { checkString, checkNumber } = require('../helpers/validData');
const { RequestNotFoundError } = require('../helpers/errors');
const { genRequestId, genHomeId } = require('../helpers/generateId');
const {
	roles: { USER, ADMIN }
} = require('../helpers/constants');

const getRequests = async (req, res, next) => {
	const { requestId } = req.query;
	const {
		details,
		details: { type }
	} = req.user;

	// Validate input
	checkString(requestId, 'Request ID', true);

	let requests;

	if (type == USER) {
		const { user } = req.user;
		requests = await Request.find({ requestor: user._id })
			.populate('hoa')
			.exec();
	}

	if (type == ADMIN) {
		const { hoa } = req.user;
		requests = await Request.find({ hoa: hoa._id }).populate('hoa').exec();
	}

	// Get specific request
	if (requestId) {
		requests = requests.find(({ requestId: ri }) =>
			requestId ? requestId == ri : true
		);

		if (!requests) throw new RequestNotFoundError();
	}

	res.json({ details, requests });
};

const processRequest = async (req, res, next) => {
	const { requestId, status } = req.body;
	const { hoa, details } = req.user;

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
	let resMessage = { message: 'Request rejected' };

	// Process request if approved
	if (status == 'approved') {
		const { name, ...address } = request.details;

		const paidUntil = new Date();
		paidUntil.setMonth(hoa.paymentDate.month);
		paidUntil.setDate(hoa.paymentDate.day);

		// Create home
		const home = await Home.create({
			homeId: genHomeId(),
			name,
			owner: request.requestor,
			hoa: hoa._id,
			address,
			paidUntil,
			residents: [{ user: request.requestor }]
		});

		resStatus = 201;
		resMessage = { message: 'Home created', homeId: home.homeId };
	}

	// Update request
	request.status = status;
	await request.save();

	res.status(resStatus).json({ ...resMessage, details });
};

module.exports = { processRequest, getRequests };
