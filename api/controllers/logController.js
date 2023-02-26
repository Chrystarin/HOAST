const Log = require('../models/Log');
const User = require('../models/User');
const HOA = require('../models/HOA');
const Vehicle = require('../models/Vehicle');
const Visitor = require('../models/Visitor');
const { checkString, checkDate } = require('../helpers/validData');
const { genLogId } = require('../helpers/generateId');
const { NotFoundError, HOANotFoundError } = require('../helpers/errors');

const addRecord = async (req, res, next) => {
	const { objId, logType, hoaId } = req.body;

	try {
		checkString(objId, 'ID');
		checkString(logType, 'Log Type');
		checkString(hoaId, 'HOA ID');

		// Find HOA
		const hoa = await HOA.findOne({ hoaId });
		if (!hoa) throw new HOANotFoundError();

		let docId;

		// Find the id depending on which model
		switch (logType) {
			case 'User':
				({ _id: docId } = await User.findOne({ userId: id }));
				break;
			case 'Vehicle':
				({ _id: docId } = await Vehicle.findOne({ plateNumber: id }));
				break;
			case 'Visitor':
				({ _id: docId } = await Visitor.findOne({ visitorId: id }));
				break;
			default:
				throw new Error('Invalid Log Type');
		}

		// Check if id is existing
		if (!docId) throw new NotFoundError(`${logType} not found.`);

		const log = await Log.create({
			logId: genLogId(),
			hoa: hoa._id,
			docId,
			logType
		});

		res.status(201).json({ message: 'Entry recorded', logId: log.logId });
	} catch (error) {
		next(error);
	}
};

const getRecords = async (req, res, next) => {
	const { hoaId, logId, logType, from, to } = req.body;

	try {
		checkString(hoaId, 'HOA ID');
		checkString(logId, 'Log ID', true);
		checkString(logType, 'Log Type', true);

		let logQuery = { hoaId };
		if (logType) logQuery.logType = logType;

		if (from && to) {
			checkDate(from, to);
			logQuery.createdAt = { $gte: new Date(from), $lte: new Date(to) };
		} else if (from) {
			checkDate(from);
			logQuery.createdAt = { $gte: new Date(from) };
		} else if (to) {
			checkDate(to);
			logQuery.createdAt = { $lte: new Date(to) };
		}

		res.status(200).json(
			await Log.find(query)
				.populate('hoa docId')
				.select('docId.userId docId.visitorId docId.plateNumber')
		);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	addRecord,
	getRecords
};
