const { Schema, model } = require('mongoose');
const { genHoaId } = require('../helpers/generateId');
const { ObjectId } = Schema.Types;

const hoaSchema = new Schema(
	{
		hoaId: {
			type: String,
			unique: true,
			default: genHoaId()
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
		homes: [
			{
				type: ObjectId,
				ref: 'Home'
			}
		],
		guards: [
			{
				guard: {
					type: ObjectId,
					ref: 'User'
				},
				status: {
					type: String,
					enum: ['active', 'retired'],
					default: 'active'
				},
				addedAt: {
					type: Date,
					default: new Date()
				}
			}
		]
	},
	{ timestamps: true }
);

module.exports = model('HOA', hoaSchema);
