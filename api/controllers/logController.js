const Log = require('../models/Log');
const User = require('../models/User');
const Visitor = require('../models/Visitor');
const Home = require('../models/Home');

const {
	UserNotFoundError,
	VisitorNotFoundError,
	VehicleNotFoundError
} = require('../helpers/errors');
const { checkString } = require('../helpers/validData');
const { genLogId } = require('../helpers/generateId');

const getLogsByLookup = async (logType, objects, objectId) => {
	const logs = await Log.find({
		logType,
		objectId: {
			// Get all objectId of each object
			$in: objects.reduce((ods, { [objectId]: od }) => [...ods, od], [])
		}
	});

	return logs.map((log) => ({
		...log,
		// Replace the logger with object with matched objectId
		objectId: objects.find(({ [objectId]: od }) => log.loggerId === od)
	}));
};

const getRecords = async (req, res, next) => {
	const { logId } = req.query;
	const { type } = req.user;

	// Validate input
	checkString(logId, 'Log ID', true);

	let logs;

	if (type === 'user') {
		const { user } = req.user;
		logs = [
			...(await Log.find({ logType: 'user', objectId: user.userId })), // user logs
			...(await getLogsByLookup('vehicle', user.vehicles, 'plateNumber')) // vehicle logs
		];
	}

	if (type === 'resident') {
		const { home } = req.user;

		// Get visitors of home
		const visitors = await Visitor.find({ home: home._id });

		logs = await getLogsByLookup('visitor', visitors, 'visitorId');
	}

	if (type === 'employee') {
		const { hoa } = req.user;

		// Get homes of hoa
		const homes = await Home.find({ hoa: hoa._id })
			.populate('residents.user')
			.exec();

		// Get visitors of each home
		const visitors = await Visitor.find({
			home: { $in: homes.reduce((ids, { _id }) => [...ids, _id], []) }
		});

		// Get residents of each home
		const residents = homes.reduce(
			(residents, { residents: { user } }) => [...residents, ...user],
			[]
		);

		// Get all vehicles of each resident of each home
		const vehicles = residents.reduce(
			(vehicles, { vehicles: userVehicles }) => [
				...vehicles,
				...userVehicles
			],
			[]
		);

		logs = [
			...(await getLogsByLookup('user', residents, 'userId')),
			...(await getLogsByLookup('visitor', visitors, 'visitorId')),
			...(await getLogsByLookup('vehicle', vehicles, 'plateNumber'))
		];
	}

	// Filter logs with logId
	logs = logs.filter(({ logId: li }) => (logId ? logId === li : true));

	res.json(logs);
};

const addRecord = async (req, res, next) => {
	const { objectId, logType } = req.body;
	const { hoa } = req.user;

	// Validate input
	checkString(objectId, 'Object ID');
	checkString(logType, 'Log Type');

	switch (logType) {
		case 'user':
			if (!(await User.findOne({ userId: objectId })))
				throw new UserNotFoundError();
			break;
		case 'visitor':
			if (!(await Visitor.findOne({ visitorId: objectId })))
				throw new VisitorNotFoundError();
			break;
		case 'vehicle':
			// Get homes of hoa
			const homes = await Home.find({ hoa: hoa._id })
				.populate('residents.user')
				.exec();

			// Get vehicles from each home of hoa
			const vehicles = homes.reduce(
				(arr1, { residents }) => [
					...arr1,
					...residents.reduce(
						(arr2, { user: { vehicles: v } }) => [...arr2, ...v],
						[]
					)
				],
				[]
			);

			if (!vehicles.find(({ plateNumber }) => plateNumber === objectId))
				throw new VehicleNotFoundError();
			break;
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
