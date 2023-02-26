const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv/config');

const { createServer } = require('https');
const { readFileSync } = require('fs');

const authenticate = require('./middlewares/authentication');

// Route Controllers
const dueRoute = require('./routes/due');
const hoaRoute = require('./routes/hoa');
const homeRoute = require('./routes/home');
const logRoute = require('./routes/log');
const requestRoute = require('./routes/request');
const userRoute = require('./routes/user');
const vehicleRoute = require('./routes/vehicle');
const visitorRoute = require('./routes/visitor');

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true }));

app.use('/users', userRoute);
app.use(authenticate);
app.use('/dues', dueRoute);
app.use('/visitors', visitorRoute);
app.use('/vehicles', vehicleRoute);
app.use('/hoas', hoaRoute);
app.use('/homes', homeRoute);
app.use('/logs', logRoute);
app.use('/requests', requestRoute);

app.use((err, req, res, next) => {
	console.log(err);

    res.status(err.status || 500).json({name: err.name, message: err.message});
});

mongoose
	.connect(process.env.DEV_MONGO)
	.then(() => {
		console.log('Connected to database');
		app.listen(process.env.PORT, (err) => {
			if (err) return console.log('Error', err);
			console.log('Listening on port', process.env.PORT);
		});
		// createServer(
		// 	{
		// 		key: readFileSync('./test/localhost.key'),
		// 		cert: readFileSync('./test/localhost.crt')
		// 	},
		// 	app
		// ).listen(process.env.PORT, (err) => {
		// 	if (err) return console.log('Failed launching server\n', err);
		// 	console.log('Listening on port', process.env.PORT);
		// });
	})
	.catch((err) => {
		console.log('Failed connecting to database\n', err);
	});
