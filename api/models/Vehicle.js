const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const vehicleSchema = new Schema(
	{
		owner: {
			type: ObjectId,
			ref: 'User',
			required: true
		},
		plateNumber: {
			type: String,
			unique: true,
			required: true
		},
		brand: { type: String, requried: true },
		model: { type: String, requried: true },
		type: { type: String, requried: true },
		color: { type: String, requried: true },
		status: {
			type: String,
			enum: ['active', 'inactive'],
			default: 'active'
		}
	},
	{ timestamps: true }
);

module.exports = model('Vehicle', vehicleSchema);
