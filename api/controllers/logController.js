const Log = require('../models/Log');
const User = require('../models/User');
const HOA = require('../models/HOA');
const { checkString } = require('../helpers/validData');
const { genLogId } = require('../helpers/generateId');

const createLog = async (req, res, next) => {
	const { id, accessType, logType } = req.body;

	try {
		checkString(accessType, 'Access Type');
		checkString(id, 'ID');
		checkString(logType, 'Log Type');

		const log = await Log.create({
			logId: genLogId(),
			accessType,
			id,
			logType
		});

		res.status(201).json({ message: 'Action recorded', logId: log.logId });
	} catch (error) {
		next(error);
	}
};

const getVisitorLogs = (req, res, next) => {};
