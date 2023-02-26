const {
	HOANotFoundError,
	NotFoundError,
	UserNotFoundError
} = require('../helpers/errors');
const { checkString } = require('../helpers/validData');
const User = require('../models/User');
const HOA = require('../models/HOA');
const Home = require('../models/Home');

const getHomes = async (req, res, next) => {
	const { hoaId, homeId } = req.body;

	try {
		checkString(hoaId, 'HOA ID', true);
		checkString(homeId, 'Home ID', true);

		let homeQuery;

		if (hoaId) {
			// Find HOA
			const hoa = await HOA.findOne({ hoaId });
			if (!hoa) throw new HOANotFoundError();

			homeQuery = { hoa: hoa._id };
		} else {
			homeQuery = { owner: req.user._id };
		}

		if (homeId) homeQuery.homeId = homeId;

		res.status(200).json(
			await Home.find(homeQuery)
				.populate('owner', 'userId')
				.populate('hoa', 'hoaId')
				.exec()
		);
	} catch (error) {
		next(error);
	}
};

const updateHomeName = async (req, res, next) => {
	const { homeId, houseName } = req.body;

	try {
		const home = await Home.findOne({ homeId });
		if (!home) throw new NotFoundError('Home');

		home.houseName = houseName;
		await home.save();

		res.status(200).json({ message: 'Home updated' });
	} catch (error) {
		next(error);
	}
};

const getResidents = async (req, res, next) => {
	const { hoaId, homeId } = req.body;

	try {
		let residents;

		if (hoaId) {
			checkString(hoaId, 'HOA ID');
			checkString(homeId, 'Home ID', true);

			// Find HOA
			const hoa = await HOA.findOne({ hoaId });
			if (!hoa) throw new HOANotFoundError();

			let homeQuery = { hoa: hoa._id };
			if (homeId) homeQuery.homeId = homeId;

			const homes = await Home.find(homeQuery)
				.populate('residents.user', 'userId')
				.exec();

			residents = homes.reduce(
				(prev, { residents: r }) => [...prev, ...r],
				[]
			);
		} else {
			checkString(homeId, 'Home ID');

			const home = await Home.findOne({ homeId }).populate(
				'residents.user',
				'userId'
			);
			if (!home) throw new NotFoundError('Home');

			({ residents } = home);
		}
		res.status(200).json(residents);
	} catch (error) {
		next(error);
	}
};

const addResident = async (req, res, next) => {
	const { homeId, userId } = req.body;

	try {
		checkString(homeId, 'Home ID');
		checkString(userId, 'User ID');

		const user = await User.findOne({ userId });
		if (!user) throw new UserNotFoundError();

		const home = await Home.findOne({
			homeId,
			'residents.user': { $ne: user._id }
		});
		if (!home) throw new NotFoundError('Home');

		home.push(user._id);
		await home.save();

		res.status(200).json({ message: 'User added as resident' });
	} catch (error) {
		next(error);
	}
};

const removeResident = async (req, res, next) => {
	const { homeId, userId } = req.body;

	try {
		checkString(homeId, 'Home ID');
		checkString(userId, 'User ID');

		const user = await User.findOne({ userId });
		if (!user) throw new UserNotFoundError();

		const home = await Home.findOne({
			homeId,
			residents: { user: user._id }
		});
		if (!home) throw new NotFoundError('Home');

		home.residents.find(({ user: u }) => u.equals(user._id)).status =
			'inactive';
		await home.save();

		res.status(200).json({ message: 'Resident removed' });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getHomes,
	updateHomeName,
	getResidents,
	addResident,
	removeResident
};
