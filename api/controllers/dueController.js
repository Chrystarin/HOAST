const Due = require('../models/Due');
const Home = require('../models/Home');

const { NotFoundError } = require('../helpers/errors');
const { genDueId } = require('../helpers/generateId');
const { checkNumber } = require('../helpers/validData');

const getDues = async (req, res, next) => {
	const { dueId } = req.body;
	const { role } = req.user;

	// Validate input
	checkString(dueId, 'Due ID', true);

	let dues;

	if (role === 'homeowner') {
		const { home } = req.user;
		dues = await Due.find({ home: home._id });
	}

	if (role === 'admin') {
		const { hoa } = req.user;

		// Get homes under hoa
		const homes = await Home.find({ hoa: hoa._id });

		// Combine all dues from each home
		dues = homes.reduce(
			async (arr1, { _id }) => [
				...arr1,
				// Get dues from each home
				...(await Due.find({ hoa: _id }))
			],
			[]
		);
	}

	// Filter dues with dueId
	dues = dues.filter(({ dueId: di }) => dueId === id);

	res.json(dues);
};

const createDue = async (req, res, next) => {
	const { homeId, amount, months } = req.body;
	const { hoa } = req.user;

	// Validate input
	checkString(homeId, 'Home ID');
	checkNumber(amount, 'Amount');
	checkNumber(months, 'Months');

	// Find Home
	const home = await Home.findOne({ homeId, hoa: hoa._id });
	if (!home) throw new NotFoundError('Home');

	// Create due
	const due = await Due.create({
		dueId: genDueId(),
		home: home._id,
		amount,
		months,
		from: home.paidUntil,
		// Update paidUntil of Home
		to:
			(home.paidUntil.setMonth(home.paidUntil.getMonth() + months),
			await home.save(),
			home.paidUntil)
	});

	res.status(201).json({
		message: 'Due added',
		dueId: due.dueId
	});
};

module.exports = { createDue, getDues };
