const { Schema, model } = require('mongoose');
const { genLogId } = require('../helpers/generateId');
const { ObjectId } = Schema.Types;

const logSchema = new Schema(
	{
		logId: {
			type: String,
			unique: true,
			default: genLogId()
		},
		hoa: {
			type: ObjectId,
			ref: 'HOA'
		},
		logType: {
			type: String,
			enum: ['User', 'Vehicle', 'Visitor'],
			required: true
		},
		id: {
			type: ObjectId,
			refPath: 'logType',
			required: true
		}
	},
	{ timestamps: true }
);

module.exports = model('Log', logSchema);
