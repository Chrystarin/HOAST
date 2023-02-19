const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const hoaSchema = new Schema(
	{
		hoaId: {
			type: String,
			required: true,
			unique: true
		},
		name: { type: String, required: true },
		address: {
			street: { type: String, required: true },
			barangay: { type: String, required: true },
			city: { type: String, required: true },
			province: { type: String, required: true }
		},
		admin: {
			type: ObjectId,
			ref: 'User',
            required: true
		},
		homeowners: [
			{
				type: ObjectId,
				ref: 'User'
			}
		],
		guards: [
			{
				user: {
					type: ObjectId,
					ref: 'User'
				},
				status: {
					type: String,
					enum: ['active', 'retired'],
					default: 'active'
				}
			}
		]
	},
	{ timestamps: true }
);

module.exports = model('HOA', hoaSchema);
