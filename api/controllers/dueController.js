const Due = require('../models/Due');

// create new due
const createDue = async (req, res) => {
    const { dueId, user, hoa, amount, month, status } = req.body;

    try{
        const newDue = await Due.Create({
            dueId: "1234567890",
            user: {},
            hoa: {},
            amount: 1000,
            month: "January",
            status: "Paid"
        });
    } catch (err) {
        res.status(400).json(err);
    }
}

module.exports = {
    createDue
}