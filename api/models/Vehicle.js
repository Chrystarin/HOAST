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
		ref: 'User'
	},
	brand: String,
	model: String,
	type: String,
	color: String,
	manufacturer: String
});

module.exports = model('Vehicle', vehicleSchema);
