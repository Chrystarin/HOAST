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
			hoa: {
				type: ObjectId,
				ref: 'HOA'
			},
			address: {
				houseNumber: Number,
				street: String,
				phase: String
			},
			residents: [
				{
					name: String
				}
			]
		}
	],
	vehicles: [{
        type: ObjectId,
        ref: 'Vehicle'
    }]
});

module.exports = model('User', userSchema);
