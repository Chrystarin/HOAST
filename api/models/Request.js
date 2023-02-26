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
		requestor: {
			type: ObjectId,
			ref: 'User',
			required: true
		},
		homeDetails: {
			homeName: { type: Number, required: true },
			houseNumber: { type: Number, required: true },
			street: { type: String, required: true },
			phase: String
		},
		status: {
			type: String,
			enum: ['pending', 'approved', 'rejected'],
			default: 'pending'
		}
	},
	{ timestamps: true }
);

module.exports = model('Request', requestSchema);
