const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
	user: {
		type: Schema.Types.ObjectID,
		ref: 'User',
		required: true
	},
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	status: {
		type: String,
		required: true,
		enum: ['new', 'in_progress', 'complete']
	}
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;