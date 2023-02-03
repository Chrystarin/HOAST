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
	boardMembers: [
		{
			member: {
				type: ObjectId,
				ref: 'User'
			},
			position: { type: String, required: true },
			status: { type: String, required: true }
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
				required: true
			}
		}
	]
});

module.exports = model('HOA', hoaSchema);
