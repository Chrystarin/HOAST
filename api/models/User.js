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
			ref: 'Home'
		}
	],
	vehicles: [
		{
			plateNumber: {
                type: String,
                unique: true,
                required: true
            },
            brand: { type: String, requried: true },
            model: { type: String, requried: true },
            type: { type: String, requried: true },
            color: { type: String, requried: true }
		}
	],
	dues: [
		{
			type: ObjectId,
			ref: 'Due'
		}
	]
});

module.exports = model('User', userSchema);
