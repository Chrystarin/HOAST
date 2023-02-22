const Visitor = require('../models/Visitor');
const HOA = require('../models/HOA');
const { HOANotFoundError } = require('../helpers/errors');

// add new visitor
const addVisitor = async (req, res, next) => {
    const { hoaId, name, purpose, arrival, departure, note } = req.body;

    try{
        const hoa = await HOA.findOne({ hoaId }).exec();
        if (!hoa) throw new HOANotFoundError();

        const newVisitor = await Visitor.create({
            hoa: hoa._id,
            name,
            purpose,
            arrival,
            departure,
            note
        });
        res.status(201).json(
            { message: "Visitor added",
            visitorId: newVisitor.visitorId
        });
    } catch (err) {
        next(err)
    }
}

// get visitor
const getVisitors = async (req, res, next) => {
    const { visitorId } = req.body;

    try{
        const visitor = await Visitor.findOne({ visitorId })
            .populate('hoa', 'hoaId')
            .populate('user', 'userId')
            .exec();
		
            if (!visitor) throw new NotFound('Visitor');
    } catch (err){
        next(err);
    }
}

module.exports = {
    addVisitor,
    getVisitors
}