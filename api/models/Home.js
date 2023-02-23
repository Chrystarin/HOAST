const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const homeSchema = new Schema({
    owner: {
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
    residents: [{
        type: ObjectId,
        ref: 'User'
    }]
});

module.exports = model('Home', homeSchema);