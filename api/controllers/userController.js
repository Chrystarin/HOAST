const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const { genUserId } = require('../helpers/generateId');
const {
	UserNotFoundError,
	ConflictError,
	UnauthorizedError
} = require('../helpers/errors');
const { checkString, checkEmail } = require('../helpers/validData');

const createToken = (userId) => {
	return jwt.sign(
		{
			userId,
			createdAt: Date.now()
		},
		process.env.JWT_SECRET,
		{ expiresIn: '30d' }
	);
};
const emailExist = new ConflictError('Email already used', 'Existing Email');

const signup = async (req, res, next) => {
	const {
		name: { firstName, lastName },
        email, 
        password
	} = req.body;

	try {
		checkString(firstName, 'First Name');
		checkString(lastName, 'Last Name');
		checkString(password, 'Password');
		checkEmail(email);

		// Check if email used
		const userEmail = await User.findOne({ credentials: { email } });
		if (userEmail) throw emailExist;

		// Create user
		const user = await User.create({
			userId: genUserId(),
			name: {
				firstName,
				lastName
			},
			credentials: {
				email,
				password: await bcrypt.hash(password, 10)
			}
		});

		res.status(201)
			.cookie('access-token', createToken(user.userId), {
				httpOnly: true,
				sameSite: 'none',
				secure: true
			})
			.json({
				message: 'Account created',
				userId: user.userId
			});
	} catch (err) {
        console.log(firstName);
        console.log(lastName);
        console.log(email);
        console.log(password);
		next(err);
	}
};

const login = async (req, res, next) => {
	const { email, password } = req.body;

    console.log(req.body);

	try {
		checkEmail(email);
		checkString(password, 'Password');

		// Find email
		const user = await User.findOne({ 'credentials.email': email }).exec();
		if (!user) throw new UnauthorizedError('Incorrect email or password');

		// Check password
		const verify = await bcrypt.compare(
			password,
			user.credentials.password
		);
		if (!verify) throw new UnauthorizedError('Incorrect email or password');

		const token = createToken(user.userId)

		res.status(201)
			.cookie('access-token', token, {
				httpOnly: true,
				sameSite: 'none',
				secure: true
			})
			.json({ id: user.userId, user: user.credentials.email, token: token  });
		
	} catch (err) {
		next(err);
	}
};

const getUser = async (req, res, next) => {
	const { userId } = req.query;

	try {
		checkString(userId, 'User ID', true);

		const user = await User.findOne(
			userId ? { userId } : { _id: req.user._id }
		)
			.populate('vehicles homes')
			.select('-credentials');
		if (!user) throw new UserNotFoundError();

		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
};

const editUser = async (req, res, next) => {
	const {
		name: { firstName, lastName },
		email,
		password
	} = req.body;

	try {
		// Check if email used
		const userEmail = await User.findOne({ 'credentials.email': email });
		if (userEmail) throw emailExist;

		// Update user
		await User.findByIdAndUpdate(req.user._id, {
			name: { firstName, lastName },
			credentials: { email, password }
		});

		res.status(200).json({ message: 'User profile updated' });
	} catch (err) {
		next(err);
	}
};

module.exports = {
	signup,
	login,
	getUser,
	editUser
};
