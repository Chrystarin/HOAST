const router = require('express').Router();

const HOA = require('../models/HOA');
const Home = require('../models/Home');

const asyncHandler = require('../middlewares/asyncHandler');

const { getRoles } = asyncHandler({
	getRoles: async (req, res, next) => {
		const { user } = req.user;

        let role = {}
        let hoas = {}

		const homes = await Home.find({ owner: user._id })
			.lean()
			.select('homeId');
		const adminHoa = await HOA.find({ admin: user._id }).lean().select('hoaId');

        const guardHoa = await HOA.find({ guards: user._id }).lean().select('hoaId');

        if (adminHoa.length>0) role = 'admin'
        if (guardHoa.length>0) role = 'guard'
        if (role=='admin') hoas = adminHoa
        if (hoas=='guard') hoas = guardHoa

		res.json({ role, homes, hoas});
	}
});

router.get('/', getRoles);

module.exports = router;
