const router = require('express').Router();

const HOA = require('../models/HOA');
const Home = require('../models/Home');

const asyncHandler = require('../middlewares/asyncHandler');

const { getRoles } = asyncHandler({
	getRoles: async (req, res, next) => {
		const { user } = req.user;

		const homes = await Home.find({ owner: user._id })
			.lean()
			.select('homeId');
		const hoas = await HOA.find({ admin: user._id }).lean().select('hoaId');

		res.json({ homes, hoas });
	}
});

router.get('/', getRoles);

module.exports = router;
