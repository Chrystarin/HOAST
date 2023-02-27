const jwt = require('jsonwebtoken');

const { UserNotFoundError } = require('../helpers/errors');
const User = require('../models/User');
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
	const { 'access-token': accessToken } = req.cookies;

	try {
		// Check if there is access token in request
		if (!accessToken) throw new UserNotFoundError();

		// Verify access-token
		const { userId } = jwt.verify(accessToken, process.env.JWT_SECRET);

		// Find user
		const user = await User.findOne({ userId });
		if (!user) throw new UserNotFoundError();

		req.user = { userId: user.userId, _id: user._id };

		next();
	} catch (error) {
		next(error);
	}
};
