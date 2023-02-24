const router = require('express').Router();
const {
	signUp,
	loginUser,
	editUser,
	joinHOA,
	getVehicles,
	getVisitors
} = require('../controllers/userController');

router.post('/signup', signUp);
router.post('/login', loginUser);
router.patch('/edit', editUser);
router.post('/join', joinHOA);
router.get('/:userId', getVehicles);
router.get('/:userId', getVisitors);

module.exports = router;
