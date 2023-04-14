const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

module.exports = model(
	'Home',
	new Schema(
		{
			homeId: { type: String, unique: true, required: true },
			name: { type: String, required: true },
			owner: {
				type: ObjectId,
				ref: 'User',
				required: [true, 'Owner is required']
			},
			hoa: {
				type: ObjectId,
				ref: 'HOA',
				required: [true, 'HOA is required']
			},
			address: {
				number: {
					type: Number,
					required: [true, 'Home Number is required']
				},
				street: {
					type: String,
					required: [true, 'Street is required']
				},
				phase: String
			},
			paidUntil: {
				type: Date,
				required: [true, 'Paid Until is required']
			},
			residents: [
				{
					user: {
						type: ObjectId,
						ref: 'User',
						required: [true, 'User is required'],
						validate: {
							validator: function (value) {
								return !this.residents?.find(({ user }) =>
									user.equals(value)
								);
							},
							message: 'User is already a resident'
						}
					},
					status: {
						type: String,
						enum: ['active', 'inactive'],
						default: 'active'
					}
				}
			],
			visitors: [
				{
					visitorId: { type: String, unique: true, required: true },
					name: {
						type: String,
						required: [true, 'Visitor Name is required']
					},
					purpose: {
						type: String,
						required: [true, 'Purpose is required']
					},
					arrival: {
						type: Date,
						required: [true, 'Arrival is required']
					},
					departure: {
						type: Date,
						required: [true, 'Departure is required']
					},
					note: String
				}
			]
		},
		{ timestamps: true }
	)
);
