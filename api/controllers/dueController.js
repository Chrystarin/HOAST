const { NotFoundError } = require('../helpers/errors');
const Due = require('../models/Due');

// create new due
const createDue = async (req, res, next) => {
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
        // res.status(400).json(err);
        next(err);
    }
}

// get due
const getDue = async (req, res, next) => {
    const { dueId } = req.body;
    
    try{
        const due = await Due.findOne({ dueId }).exec();
        if (!due) throw new NotFoundError();
    } catch (err){
        next(err);
    }
}

module.exports = {
    createDue,
    getDue
}