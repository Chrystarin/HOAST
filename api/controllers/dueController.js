const {
	NotFoundError,
	HOANotFoundError,
	UserNotFoundError
} = require('../helpers/errors');
const Due = require('../models/Due');
const User = require('../models/User');
const Home = require('../models/Home');
const HOA = require('../models/HOA');
const { genDueId } = require('../helpers/generateId');
const { checkDate, checkNumber } = require('../helpers/validData');

const createDue = async (req, res, next) => {
	const { homeId, hoaId, amount, paidUntil } = req.body;

	try {
		checkString(homeId, 'Home ID');
		checkString(hoaId, 'HOA ID');
		checkNumber(amount);
		checkDate(paidUntil);

		// Find HOA
		const hoa = await HOA.findOne({ hoaId });
		if (!hoa) throw new HOANotFoundError();

		// Find Home
		const home = await Home.findOne({ homeId, hoa: hoa._id });
		if (!home) throw new NotFoundError('Home');

		const due = await Due.Create({
			dueId: genDueId(),
			home: home._id,
			hoa: hoa._id,
			amount,
			paidUntil
		});

		res.status(201).json({
			message: 'Due added',
			dueId: due.dueId
		});
	} catch (err) {
		next(err);
	}
};

const getDues = async (req, res, next) => {
	const { homeId, hoaId, from, to } = req.body;

	try {
		checkString(homeId, 'Home ID');

		// Find home
		const home = await Home.findOne({ homeId }).exec();
		if (!home) throw new NotFoundError('Home');

		if (hoaId) {
			checkString(hoaId, 'HOA ID');

			const hoa = await HOA.findOne({ hoaId, homes: home._id });
			if (!hoa) throw new HOANotFoundError();
		}

		let dueQuery = { home: home._id };

		if (from && to) {
			checkDate(from, to);
			dueQuery.createdAt = { $gte: new Date(from), $lte: new Date(to) };
		} else if (from) {
			checkDate(from);
			dueQuery.createdAt = { $gte: new Date(from) };
		} else if (to) {
			checkDate(to);
			dueQuery.createdAt = { $lte: new Date(to) };
		}

		const dues = await Due.find(dueQuery)
			.populate('hoa', 'hoaId')
			.populate('home', 'homeId');
		res.status(200).json(dues);
	} catch (err) {
		next(err);
	}
};

module.exports = {
	createDue,
	getDues
};
