const Visitor = require('../models/Visitor');
const Home = require('../models/Home');

const {
	types: { EMPLOYEE }
} = require('../helpers/constants');
const { checkString, checkDate } = require('../helpers/validData');
const { genVisitorId } = require('../helpers/generateId');
const { VisitorNotFoundError } = require('../helpers/errors');

const addVisitor = async (req, res, next) => {
	const { name, purpose, arrival, departure, note } = req.body;
	const { home } = req.user;

	// Validate input
	checkString(name, 'Visitor Name');
	checkString(purpose, 'Purpose');
	checkString(note, 'Note');
	checkDate(arrival, 'Arrival');
	checkDate(departure, 'Departure');

	// Create visitor
	const visitor = await Visitor.create({
		visitorId: genVisitorId(),
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
};

const getVisitors = async (req, res, next) => {
	const { visitorId } = req.query;
	const { type } = req.user;

	// Validate input
	checkString(visitorId, 'Visitor ID', true);

	let visitors;

	if (USER.has(type)) {
		const { home } = req.user;
		visitors = await Visitor.find({ home: home._id });
	}

	if (EMPLOYEE.has(type)) {
		const { hoa } = req.user;

		// Get homes of hoa
		const homes = await Home.find({ hoa: hoa._id });

		visitors = await Visitor.find({
			home: { $in: homes.reduce((ids, { _id }) => [...ids, _id], []) }
		})
			.populate('home')
			.exec();
	}

	//Get specific visitor
	if (visitorId) {
		visitors = visitors.find(({ visitorId: vi }) =>
			visitorId ? visitorId == vi : true
		);

		if (!visitors) throw new VisitorNotFoundError();
	}

	res.status(200).json(visitors);
};

module.exports = { addVisitor, getVisitors };
