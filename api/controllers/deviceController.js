const { UnauthorizedError, ForbiddenError, NotFoundError } = require('../helpers/errors');
const HOA = require('../models/HOA');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const addDevice = async (req, res, next) => {
	const { email, password, hoaId, deviceIP } = req.body;

	// Find user by email and check password using bcrypt
	const user = await User.findOne({ 'credentials.email': email });

	// Compare password
	if (!user || !bcrypt.compareSync(password, user.credentials.password))
		throw new UnauthorizedError('Invalid user credentials');

	// Find HOA
	const hoa = await HOA.findOne({ hoaId }, { admin: 1, 'guards.user': 1 });
	if (!hoa) throw new NotFoundError('HOA not found');

	// Check if user is admin or guard of hoa
	if(!hoa.admin.equals(user._id) || !hoa.guards.find((guard) => guard.user.equals(user._id)))
		throw new ForbiddenError('User not guard or admin of HOA');

	// Save deviceIP to HOA
	hoa.deviceIP = deviceIP;
	await hoa.save();

	res.status(201).send('Device added');
};

module.exports = { addDevice };
