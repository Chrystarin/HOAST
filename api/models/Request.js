const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const requestSchema = new Schema(
	{
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
		homeDetails: {
			houseNumber: { type: Number, required: true },
			street: { type: String, required: true },
			phase: { type: String, required: true }
		},
		status: {
			type: String,
			enum: ['Pending', 'Approved', 'Rejected'],
			default: 'Pending'
		}
	},
	{ timestamps: true }
);

// User who requested
// HOA to join request
// Home details

module.exports = model('Request', requestSchema);
