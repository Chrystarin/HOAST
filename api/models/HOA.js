const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const hoaSchema = new Schema({
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
	homeowners: [
		{
			type: ObjectId,
			ref: 'User'
		}
	],
	guards: [
		{
			name: {
				firstName: { type: String, required: true },
				lastName: { type: String, required: true }
			},
			status: {
				type: String,
				enum: ['active', 'retired'],
				default: 'active'
			}
		}
	]
});

module.exports = model('HOA', hoaSchema);
