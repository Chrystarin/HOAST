const { Schema, model } = require('mongoose');
const { genUserId } = require('../helpers/generateId');
const { ObjectId } = Schema.Types;

const userSchema = new Schema(
	{
		userId: {
			type: String,
			unique: true,
			required: true
		},
		name: {
			firstName: { type: String, required: true },
			lastName: { type: String, required: true }
		},
		credentials: {
			email: {
				type: String,
				required: true,
				unique: true
			},
			password: {
				type: String,
				required: true
			}
		},
		homes: [{ type: ObjectId, ref: 'Home' }],
		vehicles: [{ type: ObjectId, ref: 'Vehicle' }]
	},
	{ timestamps: true, methods: {} }
);

module.exports = model('User', userSchema);
