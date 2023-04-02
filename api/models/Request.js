const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

module.exports = model(
	'Request',
	new Schema(
		{
			requestId: { type: String, unique: true, required: true },
			hoa: { type: ObjectId, ref: 'HOA', required: [true, 'HOA is required'] },
			requestor: { type: ObjectId, ref: 'User', required: [true, 'Requestor is required'] },
			details: {
				name: { type: String, required: [true, 'Home Name is required'] },
				number: { type: Number, required: [true, 'Home Number is required'] },
				street: { type: String, required: [true, 'Street is required'] },
				phase: String
			},
			status: {
				type: String,
				enum: ['pending', 'approved', 'rejected'],
				default: 'pending'
			}
		},
		{ timestamps: true }
	)
);
