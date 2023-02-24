const Visitor = require('../models/Visitor');
const HOA = require('../models/HOA');
const User = require('../models/User');
const { HOANotFoundError, UserNotFoundError } = require('../helpers/errors');

// add new visitor
const addVisitor = async (req, res, next) => {
	const { hoaId, name, purpose, arrival, departure, note } = req.body;

	try {
		const hoa = await HOA.findOne({ hoaId }).exec();
		if (!hoa) throw new HOANotFoundError();

		const newVisitor = await Visitor.create({
			hoa: hoa._id,
			name,
			purpose,
			arrival,
			departure,
			note
		});
		res.status(201).json({
			message: 'Visitor added',
			visitorId: newVisitor.visitorId
		});
	} catch (err) {
		next(err);
	}
};

// get visitor
const getVisitor = async (req, res, next) => {
	const { visitorId } = req.body;

	try {
		const visitor = await Visitor.findOne({ visitorId })
			.populate('hoa', 'hoaId')
			.populate('user', 'userId')
			.exec();

		if (!visitor) throw new NotFound('Visitor');

		res.status(200).json(visitor);
	} catch (err) {
		next(err);
	}
};

module.exports = {
	addVisitor,
	getVisitor,
};
