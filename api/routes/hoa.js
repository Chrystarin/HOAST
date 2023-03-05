const {
	registerHoa,
	addGuard,
	updateGuardStatus,
	getGuards,
	joinHoa
} = require('../controllers/hoaController');
const authorize = require('../middlewares/authorization');
const roles = require('../helpers/roles');

const router = require('express').Router();

/**
 * name
 * address
 *     street
 *     barangay
 *     city
 *     province
 */
router.post('/register', registerHoa);

/**
 * hoaId
 * address
 *     houseName
 *     houseNumber
 *     street
 *     phase - optional
 */
router.post('/join', joinHoa);

/**
 * hoaId
 * guardId - optional
 */
router.get('/guards', authorize(roles.ADMIN), getGuards);

/**
 * hoaId
 * userId
 */
router.post('/guards', authorize(roles.ADMIN), addGuard);

/**
 * hoaId
 * guardId
 * status
 */
router.patch('/guards', authorize(roles.ADMIN), updateGuardStatus);

module.exports = router;
