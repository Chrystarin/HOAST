const Log = require('../models/Log');
const User = require('../models/User');
const HOA = require('../models/HOA');
const Vehicle = require('../models/Vehicle');
const Visitor = require('../models/Visitor');
const { checkString, checkDate } = require('../helpers/validData');
const { genLogId } = require('../helpers/generateId');
const { NotFoundError, HOANotFoundError } = require('../helpers/errors');

const addRecord = async (req, res, next) => {
	const { id, logType, hoaId } = req.body;

	try {
		// Validate strings
		checkString(id, 'ID');
		checkString(logType, 'Log Type');
		checkString(hoaId, 'HOA ID');

		// Find HOA
		const hoa = await HOA.findOne({ hoaId });
		if (!hoa) throw new HOANotFoundError();

		let _id;

		// Find the id depending on which model
		switch (logType) {
			case 'User':
				({ _id } = await User.findOne({ userId: id }));
				break;
			case 'Vehicle':
				({ _id } = await Vehicle.findOne({ plateNumber: id }));
				break;
			case 'Visitor':
				({ _id } = await Visitor.findOne({ visitorId: id }));
				break;
		}

		// Check if id is existing
		if (!_id) throw new NotFoundError(`${logType} not found.`);

		const log = await Log.create({
			logId: genLogId(),
			hoa: hoa._id,
			id: _id,
			logType
		});

		res.status(201).json({ message: 'Entry recorded', logId: log.logId });
	} catch (error) {
		next(error);
	}
};

const getRecord = async (req, res, next) => {
	const { logId } = req.body;

	try {
		checkString(logId, 'Log ID');

		res.status(200).json(await Log.findOne({ logId }));
	} catch (error) {
		next(error);
	}
};

const getRecords = async (req, res, next) => {
	const {
		hoaId,
		logType,
		date: { from, to }
	} = req.body;

	try {
		checkString(hoaId, 'HOA ID');
		checkString(logType, 'Log Type', true);
		checkDate(from, 'Date from');
		checkDate(to, 'Date to');

		let query = { hoaId };
		if (logType) query.logType = logType;
		if (from) query.createdAt = { $gte: new Date(from) };
		if (to) query.createdAt = { $lte: new Date(to) };

		res.status(200).json(await Log.find(query).populate('hoa id'));
	} catch (error) {
		next(error);
	}
};

module.exports = {
	addRecord,
	getRecord,
	getRecords
};
