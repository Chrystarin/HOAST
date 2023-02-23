const { Schema, model } = require('mongoose');
const { genUserId } = require('../helpers/generateId');
const { ObjectId } = Schema.Types;

const userSchema = new Schema(
	{
		userId: {
			type: String,
			unique: true,
			default: genUserId()
		},
		name: {
			firstName: { type: String, required: true },
			lastName: { type: String, required: true }
		},
		homes: [{ type: ObjectId, ref: 'Home' }],
		vehicles: [{ type: ObjectId, ref: 'Vehicle' }],
		dues: [{ type: ObjectId, ref: 'Due' }]
	},
	{ timestamps: true, methods: {} }
);

module.exports = model('User', userSchema);
