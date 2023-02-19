const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const dueSchema = new Schema({
	dueId: {
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
	amount: {
		type: Number,
		required: true
	},
	month: {
		type: String,
		enum: [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		],
		required: true
	},
	status: {
		type: String,
		enum: [],
		required: true
	}
});

module.exports = model('Due', dueSchema);
