const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const homeSchema = new Schema({
	homeId: {
		type: String,
		unique: true,
		required: true
	},
	owner: {
		type: ObjectId,
		ref: 'User',
		required: true
	},
	hoa: {
		type: ObjectId,
		ref: 'HOA',
		required: true
	},
	address: {
		houseName: { type: String, required: true },
		houseNumber: { type: Number, required: true },
		street: { type: String, required: true },
		phase: String
	},
	residents: [
		{
			user: { type: ObjectId, ref: 'User' },
			status: {
				type: String,
				enum: ['active', 'inactive'],
				default: 'active'
			}
		}
	],
	dues: [{ type: ObjectId, ref: 'Due' }]
});

module.exports = model('Home', homeSchema);
