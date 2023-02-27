const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Home = require('../models/Home');

const { genUserId } = require('../helpers/generateId');
const {
	InvalidCredentialsError,
	InvalidEmail,
	UserNotFoundError
} = require('../helpers/errors');
const { checkString, checkEmail } = require('../helpers/validData');

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
		if (userEmail) throw new InvalidEmail('Email already used');

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

		// Create access token
		const token = jwt.sign(
			{
				userId: user.userId,
				email: user.credentials.email,
				createdAt: new Date().toISOString()
			},
			process.env.JWT_SECRET,
			{ expiresIn: '30d' }
		);

		res.status(201)
			.cookie('access-token', token, {
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
		if (!user) throw new InvalidCredentialsError();

		// Check password
		const verify = await bcrypt.compare(
			password,
			user.credentials.password
		);
		if (!verify) throw new InvalidCredentialsError();

		// Create access token
		const token = jwt.sign(
			{
				userId: user.userId,
				email: user.credentials.email,
				createdAt: new Date().toISOString()
			},
			process.env.JWT_SECRET,
			{ expiresIn: '30d' }
		);

		res.status(200)
			.cookie('access-token', token, {
				httpOnly: true,
				sameSite: 'none',
				secure: true
			})
			.json({ success: true, message: 'Logged in successfully', accessToken: token, roles: ['user', 'admin'] });
	} catch (err) {
		next(err);
	}
};

const getUser = async (req, res, next) => {
	const { userId } = req.body;

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
		if (userEmail) throw new InvalidEmail('Email already used');

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
