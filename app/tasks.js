const express = require('express');

const auth = require('../middleware/auth');
const Task = require('../models/Task');

const router = express.Router();

router.get('/', auth, async (req, res) => {
	const user = req.user;

	try {
		const tasks = await Task.find({user});

		return res.send(tasks);
	} catch (error) {
		return res.status(404).send({error: 'Tasks are not found!'});
	}
});

router.post('/', auth, async (req, res) => {
	const task = new Task(req.body);

	task.user = req.user;

	try {
		await task.save();

		return res.send(task);
	} catch (error) {
		return res.status(400).send(error);
	}
});

router.put('/:id', auth, async (req, res) => {
	const user = req.user;

	const editedTask = req.body;

	const id = req.params.id;

	try {
		if (editedTask.user) {
			return res.status(401).send({error: 'Unauthorized to edit the user field!'});
		}

		const task = await Task.findOne({user: user, _id: id});

		if (!task) {
			return res.status(404).send({error: 'Task is not found!'});
		}

		task.title = editedTask.title;
		task.description = editedTask.description;
		task.status = editedTask.status;

		await task.save();

		return res.send(task);
	} catch (error) {
		return res.status(400).send(error);
	}
});

router.delete('/:id', auth, async (req, res) => {
	const user = req.user;

	const id = req.params.id;

	try {
		const task = await Task.findOne({user: user, _id: id});

		if (!task) {
			return res.status(404).send({error: 'Task is not found!'})
		}

		await Task.deleteOne(task);

		return res.send({message: 'Task has been deleted!'});

	} catch (error) {
		return res.status(400).send(error);
	}
});

module.exports = router;