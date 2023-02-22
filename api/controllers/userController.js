const User = require('../models/User');
const Hoa = require('../models/HOA');
const Request = require('../models/Request');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { genUserId } = require('../helpers/generateId');
const { NotFoundError, InvalidCredentialsError } = require('../helpers/errors');

// create new user
const signUp = async (req, res, next) => {
    const { name: {firstName, lastName}, email, password } = req.body;
    
    try {
        const user = await User.create({credentials: {email}});
        if(user) throw new Error('Email already registered');

        const newUser = await User.create({
            userId: genUserId(),
            name: {
                firstName, lastName
            },
            email,
            password: await bcrypt.hash(password, 10)
        });
        // res.status(201).json({message: 'You had successfully created a new user', name});
        res.status(201).json({
            message: 'Account created',
            userId: newUser.userId,
            createdAt: newUser.createdAt
        })
        // res.send();

    } catch (err) {
        next(err);
    }
}

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try{
        // find email
        // if found, proceed
        // else throw error
        const user = await User.findOne({ credentials: { email } }).exec();
        if (!user) throw new InvalidCredentialsError();

        // check password if equal
        // if equal, proceed
        // else throw error
        const verify = await bcrypt.compare(password, user.credentials.password)
        if(!verify) throw new InvalidCredentialsError();

        // Create access token
        const token = jwt.sign(
            {
                userId: user.userId,
                email: user.credentials.email,
                createdAt: (new Date()).toISOString()
            },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        )

        res
            .status(200)
            .cookie(
                'access-token', 
                token, 
                {
                    httpOnly: true,
                    sameSite: 'none',
                    secure: true
                }
            )
            .json({ message: 'Logged in successfully' });
    } catch (err){
        next(err);
    }
};

// edit or update user
const editUser = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.findByIdAndUpdate(req.user._id, {
            name,
            email,
            password
        });
        res.status(200).json({
            message: 'User profile updated'
        });
    } catch (err) {
        next(err)
    }
}

// Join HOA
const joinHOA = async (req, res, next) => {
    const { hoaId, address: {houseNumber, street, phase} } = req.body;

    try{
        // Find HOA
        const hoa = await Hoa.findOne({ hoaId }).exec();
        if(!hoa) throw new HOANotFoundError();

        // add home details
        const newHome = await Home.create({
            user: req.user._id,
            address: {
                houseNumber, 
                street,
                phase
            },
            hoa: hoa._id
        })

        res.status(201).json({ message: "Hoa Joined" });
        
    } catch (err){
        next(err);
    }
}

module.exports = {
    signUp,
    loginUser,
    editUser,
    joinHOA,
    joinRequest
}