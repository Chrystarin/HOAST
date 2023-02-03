const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const vehicleSchema = new Schema({
	plateNumber: {
		type: String,
		unique: true,
		required: true
	},
	owner: {
		type: ObjectId,
		ref: 'User',
		required: true
	},
	brand: { type: String, requried: true },
	model: { type: String, requried: true },
	type: { type: String, requried: true },
	color: { type: String, requried: true },
	manufacturer: { type: String, requried: true }
});

module.exports = model('Vehicle', vehicleSchema);
