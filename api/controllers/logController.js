const Log = require('../models/Log');
const User = require('../models/User');
const Visitor = require('../models/Visitor');
const Home = require('../models/Home');

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

const getLogsByLookup = async (logType, objects, objectId) => {
	const logs = await Log.find({
		logType,
		objectId: {
			// Get all objectId of each object
			$in: objects.reduce((ods, { [objectId]: od }) => [...ods, od], [])
		}
	});

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

	if (type === USER) {
		const { user } = req.user;
		logs = [
			...(await Log.find({ logType: 'user', objectId: user.userId })), // user logs
			...(await getLogsByLookup('vehicle', user.vehicles, 'plateNumber')) // vehicle logs
		];
	}

	if (RESIDENT.has(type)) {
		const { home } = req.user;

		// Get visitors of home
		const visitors = await Visitor.find({ home: home._id });

		logs = await getLogsByLookup('visitor', visitors, 'visitorId');
	}

	if (EMPLOYEE.has(type)) {
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
			...(await getLogsByLookup('user', residents, 'userId')), // user logs
			...(await getLogsByLookup('visitor', visitors, 'visitorId')), // visitor logs
			...(await getLogsByLookup('vehicle', vehicles, 'plateNumber')) // vehicle logs
		];
	}

	// Get spcefic log
	if (logId) {
		logs = logs.find(({ logId: li }) => (logId ? logId == li : true));

		if (!logs) throw new NotFoundError('Incorrect log id');
	}

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
			if (!(await User.exists({ userId: objectId })))
				throw new UserNotFoundError();
			break;
		case 'visitor':
			if (!(await Visitor.exists({ visitorId: objectId })))
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

			if (!vehicles.find(({ plateNumber }) => plateNumber == objectId))
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
