const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv/config');

const { createServer } = require('https');
const { readFileSync } = require('fs');

const authenticate = require('./middlewares/authentication');

// Route Controllers
const userController = require('./controllers/userController');
const dueController = require('./controllers/dueController');
const visitorController = require('./controllers/visitorController');
const vehicleController = require('./controllers/vehicleController');

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true }));
app.use(authenticate);

app.use('/users', userController);
app.use('/dues', dueController);
app.use('/visitors', visitorController);
app.use('/vehicles', vehicleController);

app.use((err, req, res, next) => {
	// ERROR HANDLER
});

const User = require('./models/User');
const HOA = require('./models/HOA');
const Log = require('./models/Log');
const { genUserId, genHoaId, genLogId } = require('./helpers/generateId');

async function test() {
	// const user1 = await User.create({
	// 	userId: genUserId(),
	// 	name: { firstName: 'fn1', lastName: 'ln1' }
	// });

	// user1.vehicles.push({
	//     plateNumber: 'pn1',
	//     brand: 'b1',
	//     model: 'm1',
	//     type: 't1',
	//     color: 'c1'
	// })

	// await user1.save();

	// const log1 = await Log.create({
	//     logId: genLogId(),
	//     accessType: 'Vehicle',
	//     id: user1.vehicles.find(v => v.plateNumber === 'pn1')._id,
	//     logType: 'entry'
	// });

	// const log2 = await Log.create({
	//     logId: genLogId(),
	//     accessType: 'Vehicle',
	//     id: user1.vehicles.find(v => v.plateNumber === 'pn1')._id,
	//     logType: 'exit'
	// });
	const logs = await Log.find().populate('id');
	console.log(logs);
}

mongoose
	.connect(process.env.DEV_MONGO)
	.then(() => {
		console.log('Connected to database');
		// app.listen(process.env.PORT, (err) => {
		// 	if (err) return console.log('Error', err);
		// 	console.log('Listening on port', process.env.PORT);
		// });
		createServer(
			{
				key: readFileSync('./test/localhost.key'),
				cert: readFileSync('./test/localhost.crt')
			},
			app
		).listen(process.env.PORT, (err) => {
			if (err) return console.log('Failed launching server\n', err);
			console.log('Listening on port', process.env.PORT);
		});

		test();
	})
	.catch((err) => {
		console.log('Failed connecting to database\n', err);
	});
