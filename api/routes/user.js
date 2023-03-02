const router = require('express').Router();
const authenticate = require('../middlewares/authentication');
const {
	signup,
	login,
	editUser,
    getUser
} = require('../controllers/userController');


/**
 * name
 *     firstName
 *     lastName
 * email
 * password
 */
router.post('/signup', signup);

/**
 * email
 * password
 */
router.post('/login', login);

// router.use(authenticate);

/**
 * userId - optional
 */
router.get('/', getUser);

/**
 * name
 *     firstName
 *     lastName
 * email
 * password
 */
router.patch('/edit', editUser);

module.exports = router;
