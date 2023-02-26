const HOA = require('../models/HOA');
const User = require('../models/User');
const Request = require('../models/Request');
const Home = require('../models/Home');
const { checkString, checkNumber } = require('../helpers/validData');
const { HOANotFoundError, NotFoundError } = require('../helpers/errors');
const { genRequestId, genHomeId } = require('../helpers/generateId');

const createRequest = async (req, res, next) => {
	const { hoaId, houseName, houseNumber, street, phase } = req.body;

	try {
		checkString(hoaId, 'HOA ID');
		checkString(houseName, 'House Name');
		checkNumber(houseNumber, 'House Number');
		checkString(street, 'Street');
		checkString(phase, 'Phase', true);

		// Find HOA
		const hoa = await HOA.findOne({ hoaId });
		if (!hoa) throw new HOANotFoundError();

		// Create home details
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
			message: 'Request created',
			requestId: request.requestId
		});
	} catch (error) {
		next(error);
	}
};

const processRequest = async (req, res, next) => {
	const { requestId, status } = req.body;

	try {
		checkString(requestId, 'Request ID');
		checkString(status, 'Request Status');

		// Find request
		const request = await Request.findOne({ requestId, status: 'pending' });
		if (!request) throw new NotFoundError('Request');

		request.status = status;

		let response = { message: `Request ${status}` };

		if (status === 'approved') {
			// Create home
			const home = await Home.create({
				homeId: genHomeId(),
				owner: request.requestor,
				hoa: request.hoa,
				address: request.homeDetails,
				residents: [{ user: request.requestor }]
			});

			await User.findByIdAndUpdate(home.requestor, {
				$push: { homes: home._id }
			});

			response.homeId = home.homeId;
		}

		res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

const getRequests = async (req, res, next) => {
	const { hoaId, requestId } = req.body;

	try {
		checkString(hoaId, 'HOA ID', true);
		checkString(requestId, 'Request ID', true);

		let requestQuery = {};
		if (hoaId) requestQuery.hoaId = hoaId;
		if (requestId) requestQuery.requestId = requestId;

		res.status(200).json(
			await Request.find(requestQuery)
				.populate('hoa', 'hoaId')
				.populate('requestor', 'userId')
		);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	createRequest,
	processRequest,
	getRequests
};
