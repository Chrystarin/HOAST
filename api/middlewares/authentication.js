const jwt = require('jsonwebtoken');

const User = require('../models/User');

const { UserNotFoundError, UnauthorizedError } = require('../helpers/errors');
const { asyncHandler } = require('./asyncHandler');
const { JWT_SECRET } = process.env;

module.exports = asyncHandler(async (req, res, next) => {
	const { 'access-token': accessToken } = req.cookies;

	// Check if there is access token in request
	if (!accessToken) throw new UnauthorizedError('Log in first');

	// Verify access-token
	const { userId } = jwt.verify(accessToken, JWT_SECRET);

	// Find user
	const user = await User.findOne({ userId });
	if (!user) throw new UserNotFoundError();

	req.user = { user, type: 'user' };

	next();
});
