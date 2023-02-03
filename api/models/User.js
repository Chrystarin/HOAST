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
	homes: [
		{
			type: ObjectId,
			ref: 'Home',
			required: true
		}
	],
	vehicles: [
		{
			type: ObjectId,
			ref: 'Vehicle',
			required: true
		}
	],
	dues: [
		{
			type: ObjectId,
			ref: 'Due',
			required: true
		}
	]
});

module.exports = model('User', userSchema);
