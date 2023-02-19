const { UserNotFoundError } = require('../helpers/errors');
const User = require('../models/User');

module.exports = async (req, res, next) => {
	const { accessToken } = req.cookies;

	if (!accessToken) return next();

	try {
		const { userId } = jwt.verify(token, process.env.JWT_SECRET);

		const user = await User.findOne({ userId });
		if (!user) return next(new UserNotFoundError());

		req.user = {
			_id: user._id,
			userId
		};

		next();
	} catch (error) {
		next(error);
	}
};
