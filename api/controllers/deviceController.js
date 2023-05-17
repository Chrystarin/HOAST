const { UnauthorizedError, ForbiddenError } = require('../helpers/errors');
const HOA = require('../models/HOA');
const User = require('../models/User');

const addDevice = async (req, res, next) => {
	const { email, password, hoaId, deviceIP } = req.body;

	// Find user by email and check password using bcrypt
	const user = await User.findOne({ email });
	if (!user || !(await bcrypt.compare(password, user.password)))
		throw new UnauthorizedError('Invalid user credentials');

	// Check if user is admin or guard of hoaId
	const hoa = await HOA.findOne({
		hoaId,
		$or: [
			{ admin: user._id },
			{ 'guards.user': user._id, 'guards.status': 'active' }
		]
	});
	if (!hoa) throw new ForbiddenError('User not guard or admin of HOA');

	hoa.deviceIP = deviceIP;
	await hoa.save();

	res.status(201).send('Device added');
};

module.exports = { addDevice };
