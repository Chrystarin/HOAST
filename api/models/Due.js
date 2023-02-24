const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const dueSchema = new Schema({
	dueId: {
		type: String,
		unique: true,
		required: true
	},
	home: {
		type: ObjectId,
		ref: 'Home'
	},
	hoa: {
		type: ObjectId,
		ref: 'HOA'
	},
	amount: {
		type: Number,
		required: true
	},
	paidUntil: {
		type: Date,
		required: true
	}
});

module.exports = model('Due', dueSchema);
