const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv/config');

const { createServer } = require('https');
const { readFileSync } = require('fs');

const authenticate = require('./middlewares/authentication');

// Route Controllers
const userRoute = require('./routes/user');
const dueRoute = require('./routes/due');
const visitorRoute = require('./routes/visitor');
const vehicleRoute = require('./routes/vehicle');

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true }));
app.use(authenticate);

app.use('/users', userRoute);
app.use('/dues', dueRoute);
app.use('/visitors', visitorRoute);
app.use('/vehicles', vehicleRoute);

app.use((err, req, res, next) => {
	// ERROR HANDLER
});

const User = require('./models/User');
const HOA = require('./models/HOA');
const Log = require('./models/Log');
const { genUserId, genHoaId, genLogId } = require('./helpers/generateId');

async function test() {
	const user1 = await User.create({
		userId: genUserId(),
		name: { firstName: 'fn1', lastName: 'ln1' }
	});

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
	const user2 = await User.create({
		userId: genUserId(),
		name: { firstName: 'fn2', lastName: 'ln2' }
	});

	const user3 = await User.create({
		userId: genUserId(),
		name: { firstName: 'fn3', lastName: 'ln3' }
	});

	const hoa1 = await HOA.create({
		hoaId: genHoaId(),
		name: 'hoa1',
		address: {
			street: 'hoa1_s',
			barangay: 'hoa1_b',
			city: 'hoa1_c',
			province: 'hoa1_p'
		},
		admin: user1._id,
		guards: [
			{
				guard: user2._id
			},
			{
				guard: user3._id
			}
		]
	});
	// const hoa = await HOA.findOne({ hoaId: 'taQBrVFVssolSaC' });
	// const guard = await hoa.getGuard('glk_TLJZesolSoq');

	// guard.status = 'active';
	// await hoa.save()

	// console.log(hoa);
}

mongoose
	.connect(process.env.DEV_MONGO)
	.then(() => {
		// console.log('Connected to database');
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
