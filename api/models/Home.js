const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const homeSchema = new Schema({
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    hoa: {
        type: ObjectId,
        ref: 'HOA',
        required: true
    },
    address: {
        houseNumber: { type: Number, required: true },
        street: { type: String, required: true },
        phase: { type: String, required: true }
    },
    residents: [String]
});

module.exports = model('Home', homeSchema);