const router = require('express').Router();

const asyncHandler = require('../middlewares/asyncHandler');
const authenticate = require('../middlewares/authentication');

const { signup, login, updateUser } = asyncHandler(
	require('../controllers/userController')
);

/**
 * Signup user
 *
 * firstName
 * lastName
 * email
 * password
 */
router.post('/signup', signup);

/**
 * Login user
 *
 * email
 * password
 */
router.post('/login', login);

router.use(authenticate);

/**
 * Edit user info
 *
 * firstName
 * lastName
 * email
 * password
 */
router.patch('/', updateUser);

module.exports = router;
