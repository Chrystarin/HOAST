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

		const home = await Home.findOne({
			homeId,
			'residents.user': req.user._id
		});
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
		checkString(visitorId, 'Visitor ID', true);

		// Create query for visitors
		let visitorQuery = {};

		if (hoaId) {
			checkString(hoaId, 'HOA ID');
			checkString(homeId, 'Home ID', true);

			// Find HOA
			const hoa = await HOA.findOne({ hoaId });
			if (!hoa) throw new HOANotFoundError();

			visitorQuery.hoa = hoa._id;

			if (homeId) {
				// Find Home
				const home = await Home.findOne({ homeId });
				if (!home) throw new NotFoundError('Home');

				// Check if home is in hoa
				if (!hoa.homes.includes(home._id))
					throw new Error('Home not in HOA');

				visitorQuery.home = home._id;
			}
		} else {
			checkString(homeId, 'Home ID');

			// Find Home
			const home = await Home.findOne({ homeId });
			if (!home) throw new NotFoundError('Home');

			visitorQuery.home = home._id;
		}

		if (visitorId) visitorQuery.visitorId = visitorId;

		// Find visitors
		const visitors = await Visitor.find(visitorQuery)
			.populate('home', 'homeId')
			.populate('hoa', 'hoaId')
			.exec();

		res.status(200).json(visitors);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	addVisitor,
	getVisitors
};
