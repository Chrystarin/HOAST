const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const userSchema = new Schema({
	userId: {
		type: String,
		required: true,
		unique: true
	},
	name: {
		firstName: { type: String, required: true },
		lastName: { type: String, required: true }
	},
	homes: [{ type: ObjectId, ref: 'Home' }],
	vehicles: [{ type: ObjectId, ref: 'Vehicle' }],
	dues: [{ type: ObjectId, ref: 'Due' }]
});

module.exports = model('User', userSchema);
