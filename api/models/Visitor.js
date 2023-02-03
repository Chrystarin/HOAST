const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const visitorSchema = new Schema({
	visitorId: {
		type: String,
		unique: true,
		required: true
	},
	user: {
		type: ObjectId,
		ref: 'User'
	},
	hoa: {
		type: ObjectId,
		ref: 'HOA'
	},
	name: String,
	purpose: String,
	arrival: Number,
	departure: Number,
	note: String
});

module.exports = model('Vistior', visitorSchema);
