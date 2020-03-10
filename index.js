const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const users = require('./app/users');
const tasks = require('./app/tasks');

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

const run = async () => {
	await mongoose.connect('mongodb://localhost/todoList', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	});

	app.use('/users', users);
	app.use('/tasks', tasks);

	app.listen(port, () => {
		console.log(`Server started on ${port} port!`);
	});
};

run().catch(error => {
	console.error(error);
});