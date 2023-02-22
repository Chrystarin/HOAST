const { NotFoundError, HOANotFoundError, UserNotFoundError } = require('../helpers/errors');
const Due = require('../models/Due');
const User = require('../models/User');
const HOA = require('../models/HOA');
const { genDueId } = require('../helpers/generateId');

// create new due
const createDue = async (req, res, next) => {
    const { userId, hoaId, amount, paidUntil } = req.body;

    try{
        const hoa = await HOA.findOne({ hoaId }).exec();
        if (!hoa) throw new HOANotFoundError();

        const user = await User.findOne({ userId }).exec();
        if (!user) throw new UserNotFoundError();

        const newDue = await Due.Create({
            dueId: genDueId(),
            user: user._id,
            hoa: hoa._id,
            amount,
            paidUntil
        });

        res.status(201).json({
            message: "Due added",
            dueId: newDue.dueId
        });
    } catch (err) {
        next(err);
    }
}

// get due
const getDue = async (req, res, next) => {
    const { dueId } = req.body;
    
    try{
        const due = await Due.findOne({ dueId })
            .populate('hoa', 'hoaId')
            .populate('user', 'userId')
            .exec();
        
            if (!due) throw new NotFoundError();

        res.status(200).json(due);
    } catch (err){
        next(err);
    }
}

const getDues = async (req, res, next) => {
    const {userId, hoaId, startDate, endDate, paidUntil} = req.body;

    try{
        const user = await User.findOne(userId).exec();
        if (!user) throw new UserNotFoundError();

        const hoa = await HOA.findOne(hoaId).exec();
        if (!hoa) throw new HOANotFoundError();

        let dueQuery = { hoa: hoa._id }
        if (userId) dueQuery.user = user._id;
        if (startDate) dueQuery.createdAt = { $gte: new Date(startDate) };
        if (endDate) dueQuery.createdAt = { $lte: new Date(endDate) };

        const dues = await Due.find(dueQuery);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createDue,
    getDue
}