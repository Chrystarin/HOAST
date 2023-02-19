const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const requestSchema = new Schema({
    requestId: {
        type: String,
        unique: true,
        required: true
    },
    hoa: {
        type: ObjectId,
        ref: 'HOA',
        required: true
    },
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: [],
        required: true
    },
    addedAt: {
        type: Number,
        required: true
    }
});

module.exports = model('Request', requestSchema);