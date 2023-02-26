const HOA = require('../models/HOA');
const Home = require('../models/Home');
const { InvalidAction, HOANotFoundError } = require('../helpers/errors');
const role = require('../helpers/roles');
const { checkString } = require('../helpers/validData');

module.exports = (...roles) => {
	return async (req, res, next) => {
		if (roles.contains(role.ADMIN)) {
			const { hoaId } = req.body;

			try {
				checkString(hoaId, 'HOA ID');

				const hoa = await HOA.findOne({ hoaId, admin: req.user._id });
				if (!hoa) throw new InvalidAction();

				return next();
			} catch (error) {
				return next(error);
			}
		}

		if (roles.contains(role.GUARD)) {
			const { hoaId } = req.body;

			try {
				checkString(hoaId, 'HOA ID');

				const hoa = await HOA.findOne({
					hoaId,
					guards: { guard: req.user._id, status: 'active' }
				});
				if (!hoa) throw new InvalidAction();

				return next();
			} catch (error) {
				return next(error);
			}
		}

		if (roles.contains(role.HOMEOWNER)) {
			const { homeId } = req.body;

			try {
				checkString(homeId, 'Home ID');

				const home = await Home.findOne({
					homeId,
					owner: req.user._id
				});
				if (!home) throw new InvalidAction();

				return next();
			} catch (error) {
				return next(error);
			}
		}

		if (roles.contains(role.SELF)) return next();

		next(new InvalidAction());
	};
};
/**
 * Admin
 * Homeowner
 * Guard
 * Resident
 */
