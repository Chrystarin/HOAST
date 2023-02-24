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
		homeowners: [
			{
				type: ObjectId,
				ref: 'User'
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
	{
		timestamps: true,
		methods: {
			async getGuard(guardId) {
                // return (await this.populate('guards.guard', 'userId')).guards.find(({ guard: { userId } }) => userId == guardId);
				return (await this.populate('guards.guard', 'userId')).guards.find(
					({ guard: { userId } }) => userId == guardId
				);
			}
		}
	}
);

module.exports = model('HOA', hoaSchema);
