const { Schema, model } = require('mongoose');
const { genLogId } = require('../helpers/generateId');
const { ObjectId } = Schema.Types;

const visitorSchema = new Schema({
	visitorId: {
		type: String,
		unique: true,
		default: genLogId()
	},
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
	name: { type: String, required: true },
	purpose: { type: String, required: true },
	arrival: { type: Number, required: true },
	departure: { type: Number, required: true },
	note: { type: String, required: true }
});

module.exports = model('Vistior', visitorSchema);
