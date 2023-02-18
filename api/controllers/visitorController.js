const Visitor = require('../models/Visitor');

// create new visitor
const createVisitor = async (req, res) => {
    const { visitorId, user, hoa, name, purpose, arrival, departure, note } = req.body;

    try{
        const newVisitor = await Visitor.create({
            visitorId: "1234567890",
            user: {},
            hoa: {},
            name: "John Doe",
            purpose: "Visit",
            arrival: "2020-01-01",
            departure: "2020-01-02",
            note: "This is a note"
        });
    } catch (err) {
        res.status(400).json(err);
    }
}

// update visitor
const updateVisitor = async (req, res) => {
    const { visitorId, user, hoa, name, purpose, arrival, departure, note } = req.body;

    try {
        const visitor = await Visitor.findByIdAndUpdate(req.body, {
            visitorId,
            user,
            hoa,
            name,
            purpose,
            arrival,
            departure,
            note
        });
        res.status(200).json(visitor);
    } catch (err) {
        res.status(400).json(err);
    }
}

module.exports = {
    createVisitor
}