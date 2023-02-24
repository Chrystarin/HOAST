const User = require('../models/User');
const HOA = require('../models/HOA');
const userRoles = require('../helpers/roles');

module.exports = (...roles) => {
	return async (req, res, next) => {
		const { hoaId } = req.body;

		try {
			const hoa = await HOA.findOne({ hoaId });

			// Check if user is admin of hoa
			if (
				roles.includes(userRoles.ADMIN) &&
				!!hoa &&
				hoa.admin.equals(req.user._id)
			) {
			}

			// Check if user is homeowner

			// Check if user is guard

			// Check if user is resident
		} catch (error) {
			next(error);
		}
	};
};
/**
 * Admin
 * Homeowner
 * Guard
 * Resident
 */
