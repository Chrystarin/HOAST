const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');

const HOA = require('./models/HOA');

const app = express();

app.use(express.json());

mongoose.connect(process.env.DEV_MONGO).then(() => {
	console.log('Connected to database');
	app.listen(process.env.PORT, (err) => {
		if (err) return console.log('Error', err);
		console.log('Listening on port', process.env.PORT);
	});
});
