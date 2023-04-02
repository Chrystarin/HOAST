const HOA = require('../models/HOA');
const Home = require('../models/Home');

const { ForbiddenError } = require('../helpers/errors');
const { checkString } = require('../helpers/validData');

const allowResident = async (req, res, next) => {
	const homeId = req.query?.homeId || req.body?.homeId;
	const { user } = req.user;

	try {
		// Validate input
		checkString(homeId, 'Home ID');

		// Find home
		const home = await Home.findOne({
			homeId,
			'residents.user': req.user.user._id,
			status: 'active'
		})
			.populate('residents.user')
			.exec();
		if (!home) throw undefined;

		// Add properties
		req.user.type = 'resident';
		req.user.role = home.owner.equals(user._id) ? 'homeowner' : 'resident';
		req.user.home = home;
	} finally {
		next();
	}
};

const allowEmployee = async (req, res, next) => {
	const hoaId = req.query?.hoaId || req.body?.hoaId;
	const { user } = req.user;

	try {
		// Validate input
		checkString(hoaId, 'HOA ID');

		// Find HOA
		const hoa = await HOA.findOne({ hoaId });
		if (!hoa) throw undefined;

		// Check if admin
		if (hoa.admin.equals(user._id)) req.user.role = 'admin';

		// Check if guard
		if (
			hoa.guards.find(
				({ user: guard, status }) =>
					guard.equals(user._id) && status === 'active'
			)
		)
			req.user.role = 'guard';

		// Add hoaId property to req.user
		req.user.hoa = hoa;
		req.user.type = 'employee';
	} finally {
		next();
	}
};

const onlyAdmin = async (req, res, next) => {
	if (req.role === 'admin') return next();
	next(new ForbiddenError('User is not Admin of HOA'));
};

const onlyGuard = async (req, res, next) => {
	if (req.role === 'guard') return next();
	next(new ForbiddenError('User is not an active Guard of HOA'));
};

const onlyHomeowner = async (req, res, next) => {
	if (req.role === 'homeowner') return next();
	next(new ForbiddenError('User is not Homeowner of Home'));
};

const onlyResident = async (req, res, next) => {
	if (req.role === 'resident') return next();
	next(new ForbiddenError('User is not Resident of Home'));
};

const onlyUser = async (req, res, next) => {
	if (req.type === 'user') return next();
	next(new ForbiddenError('User is not itself'));
};

const onlyEmployee = async (req, res, next) => {
	if (req.type === 'employee') return next();
	next(new ForbiddenError('User not an active Employee of HOA'));
};

const onlyHomeResident = async (req, res, next) => {
	if (req.type === 'resident') return next();
	next(new ForbiddenError('User is not Resident of Home'));
};

const inHoa = async (req, res, next) => {
	if (req.role) return next();
	next(new ForbiddenError('User not joined in HOA'));
};

module.exports = {
	allowEmployee,
	allowResident,
	onlyAdmin,
	onlyGuard,
	onlyHomeowner,
	onlyResident,
	onlyUser,
	onlyEmployee,
	onlyHomeResident,
	inHoa
};
