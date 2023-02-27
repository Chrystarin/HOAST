const HOA = require('../models/HOA');
const Home = require('../models/Home');
const {
	InvalidAction,
	HOANotFoundError,
	NotFoundError
} = require('../helpers/errors');
const role = require('../helpers/roles');
const { checkString } = require('../helpers/validData');

module.exports = (...roles) => {
	return async (req, res, next) => {
		if (roles.includes(role.ADMIN)) {
			const { hoaId } = req.body;

			try {
				checkString(hoaId, 'HOA ID');

				const hoa = await HOA.findOne({ hoaId, admin: req.user._id });
				if (!hoa) throw new InvalidAction();

				return next();
			} catch (error) {}
		}

		if (roles.includes(role.GUARD)) {
			const { hoaId } = req.body;

			try {
				checkString(hoaId, 'HOA ID');

				const hoa = await HOA.findOne({
					hoaId,
					'guards.guard': req.user._id,
					'guards.status': 'actve'
				});
				if (!hoa) throw new InvalidAction();

				return next();
			} catch (error) {}
		}

		if (roles.includes(role.HOMEOWNER)) {
			const { homeId } = req.body;

			try {
				checkString(homeId, 'Home ID');

				const home = await Home.findOne({
					homeId,
					owner: req.user._id
				});
				if (!home) throw new InvalidAction();

				return next();
			} catch (error) {}
		}

		if (roles.includes(role.RESIDENT)) {
			const { homeId } = req.body;

			try {
				checkString(homeId, 'Home ID');

				const home = await Home.findOne({
					'residents.user': req.user._id,
					'residents.status': 'active'
				});
				if (!home) throw new NotFoundError('Home');

				return next();
			} catch (error) {}
		}

		next(new InvalidAction());
	};
};
/**
 * Admin
 * Homeowner
 * Guard
 * Resident
 */
