const User = require('../models/User');

// create new user
const createUSer = async (req, res) => {
    const { userId, name, homes, vehicles, dues } = req.body;

    // check for duplication or exising user in the database
    const checkUSer = await User.findOne({ name: name }).exec();
    if (checkUSer) return res.status(400).json({ message: 'User already exists' });
    
    try {
        const newUser = await User.Create({
            userId: "1234567890",
            name: {
                firstName: "John",
                lastName: "Doe"
            },
            homes: [],
            vehicles: {
                plateNumber: "BLK123",
                brand: "Toyota",
                model: "Vios",
                type: "Sedan",
                color: "Black"
            },
            dues: []
        });
    } catch (err) {
        res.status(400).json(err);
    }
}

// edit or update user
const editUser = async (req, res) => {
    const { userId, name, homes, vehicles, dues } = req.body;

    try {
        const user = await User.findByIdAndUpdate(req.body, {
            userId,
            name,
            homes,
            vehicles,
            dues
        });
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err);
    }
}

module.exports = {
    createUSer
}