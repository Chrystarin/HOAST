const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

module.exports = model(
	'Vistior',
	new Schema(
		{
			visitorId: { type: String, unique: true, required: true },
			home: {
				type: ObjectId,
				ref: 'Home',
				required: [true, 'Home is required']
			},
			name: {
				type: String,
				required: [true, 'Visitor Name is required']
			},
			purpose: { type: String, required: [true, 'Purpose is required'] },
			arrival: { type: Date, required: [true, 'Arrival is required'] },
			departure: {
				type: Date,
				required: [true, 'Departure is required']
			},
			note: String
		},
		{ timestamps: true }
	)
);
