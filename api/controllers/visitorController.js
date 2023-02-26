const Visitor = require('../models/Visitor');
const HOA = require('../models/HOA');
const Home = require('../models/Home');
const User = require('../models/User');
const { HOANotFoundError, NotFoundError } = require('../helpers/errors');
const { checkString, checkDate } = require('../helpers/validData');

const addVisitor = async (req, res, next) => {
	const { homeId, name, purpose, arrival, departure, note } = req.body;

	try {
		checkString(homeId, 'Home ID');
		checkString(name, 'Visitor Name');
		checkString(purpose, 'Purpose');
		checkString(note, 'Note');
		checkDate(arrival, departure);

		const home = await Home.findOne({ homeId });
		if (!home) throw new NotFoundError('Home');

		const visitor = await Visitor.create({
			home: home._id,
			hoa: home.hoa,
			name,
			purpose,
			arrival,
			departure,
			note
		});

		res.status(201).json({
			message: 'Visitor added',
			visitorId: visitor.visitorId
		});
	} catch (err) {
		next(err);
	}
};

const getVisitors = async (req, res, next) => {
	const { hoaId, homeId, visitorId } = req.body;

	try {
		checkString(hoaId, 'HOA ID');
		checkString(homeId, 'Home ID', true);
		checkString(visitorId, 'Visitor ID', true);

		// Find HOA
		const hoa = await HOA.findOne({ hoaId });
		if (!hoa) throw new HOANotFoundError();

		// Create query for visitors
		let visitorQuery = { hoa: hoa._id };

		// Find home if homeId is given and add to query its _id
		if (homeId) {
			const home = await Home.findOne({ homeId });
			if (!home) throw new NotFoundError('Home');

			visitorQuery.home = home._id;
		}

		// If visitorId is given, add it to query
		if (visitorId) visitorQuery.visitorId = visitorId;

		// Initiate the query
		res.status(200).json(
			await Visitor.find(visitorQuery)
				.populate('home', 'homeId')
				.populate('hoa', 'hoaId')
				.exec()
		);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	addVisitor,
	getVisitors
};
