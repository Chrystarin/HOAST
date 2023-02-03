const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const logSchema = new Schema({
	logId: {
		type: String,
		unique: true,
		required: true
	},
	id: {
		type: ObjectId,
		refPath: 'accessType'
	},
	accessType: {
		type: String,
		required: true,
		enum: ['Vehicle', 'Visitor']
	},
	logType: {
		type: String,
		enum: ['entry', 'exit']
	},
	timestamp: Number
});

module.exports = model('Log', logSchema);
