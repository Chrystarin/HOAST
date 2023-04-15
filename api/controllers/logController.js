const Log = require('../models/Log');

const {
	UserNotFoundError,
	VisitorNotFoundError,
	VehicleNotFoundError,
	NotFoundError
} = require('../helpers/errors');
const {
	roles: { USER },
	types: { EMPLOYEE, RESIDENT }
} = require('../helpers/constants');
const { checkString } = require('../helpers/validData');
const { genLogId } = require('../helpers/generateId');
const extractHomes = require('../helpers/extractHomes');

const getLogsByLookup = async (logType, objects, objectId) => {
	const logs = await Log.find({
		logType,
		objectId: {
			// Get all objectId of each object
			$in: objects.reduce((ods, { [objectId]: od }) => [...ods, od], [])
		}
	}).lean();

	return logs.map(({ objectId: oi, ...log }) => ({
		...log,
		// Add the matched object from objects using objectId
		[logType]: objects.find(({ [objectId]: od }) => oi == od)
	}));
};

const getRecords = async (req, res, next) => {
	const { logId } = req.query;
	const { type } = req.user;

	// Validate input
	checkString(logId, 'Log ID', true);

	let logs;

	if (type == USER) {
		const { user } = req.user;
		logs = [
			// user logs
			...(await Log.find({
				logType: 'user',
				objectId: user.userId
			}).lean()),
			// vehicle logs
			...(await getLogsByLookup('vehicle', user.vehicles, 'plateNumber'))
		];
	}

	if (RESIDENT.has(type)) {
		const { home } = req.user;
		logs = await getLogsByLookup('visitor', home.visitors, 'visitorId');
	}

	if (EMPLOYEE.has(type)) {
		const { hoa } = req.user;

		// Extract all data from homes under hoa
		const { residents, visitors, vehicles } = await extractHomes({
			hoa: hoa._id
		});

		logs = [
			...(await getLogsByLookup('user', residents, 'userId')), // user logs
			...(await getLogsByLookup('visitor', visitors, 'visitorId')), // visitor logs
			...(await getLogsByLookup('vehicle', vehicles, 'plateNumber')) // vehicle logs
		];
	}

	// Get spcefic log
	if (logId) {
		logs = logs.find(({ logId: li }) => logId == li);

		if (!logs) throw new NotFoundError('Incorrect log id');
	}

	res.json(logs);
};

const addRecord = async (req, res, next) => {
	const { objectId, logType } = req.body;
	const { hoa } = req.user;


    console.log(req.body)

	// Validate input
	checkString(objectId, 'Object ID');
	checkString(logType, 'Log Type');

	// Extract all data from homes under hoa
	const { residents, visitors, vehicles } = await extractHomes({ hoa: hoa._id });

    console.log(visitors)

	switch (logType) {
		case 'user':
			if (residents.find(({ user: { userId } }) => userId == objectId))
				break;
			throw new UserNotFoundError();
		case 'visitor':
			if (visitors.find(({ visitorId }) => visitorId == objectId)) break;
			throw new VisitorNotFoundError();
		case 'vehicle':
			if (vehicles.find(({ plateNumber }) => plateNumber == objectId))
				break;
			throw new VehicleNotFoundError();
	}

	// Create log
	const log = await Log.create({
		logId: genLogId(),
		hoa: hoa._id,
		logType,
		objectId
	});

	res.status(201).json({ message: 'Log saved', logId: log.logId });
};

module.exports = { addRecord, getRecords };
