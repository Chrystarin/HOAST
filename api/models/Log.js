const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const logSchema = new Schema({
	logId: {
		type: String,
		unique: true,
		required: true
	},
	accessType: {
		type: String,
		enum: ['Vehicle', 'Visitor'],
		required: true
	},
	id: {
		type: ObjectId,
		refPath: 'accessType',
		required: true
	},
	logType: {
		type: String,
		enum: ['entry', 'exit'],
		required: true
	},
	timestamp: { type: Number, required: true }
});

module.exports = model('Log', logSchema);
