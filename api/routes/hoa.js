const router = require('express').Router();

const asyncHandler = require('../middlewares/asyncHandler');
const {
	onlyEmployee,
	allowEmployee,
	onlyAdmin,
	onlyUser
} = require('../middlewares/authorization');

const { registerHoa, getHoas, addGuard, retireGuard, getGuards, joinHoa } =
	asyncHandler(require('../controllers/hoaController'));

/**
 * name
 * street
 * barangay
 * city
 * province
 */
router.post('/register', onlyUser, registerHoa);

/**
 * Create a join request in HOA
 *
 * hoaId
 * name
 * number
 * street
 * phase - optional
 */
router.post('/join', onlyUser, joinHoa);

/**
 * hoaId - optional [one | many]
 */
router.get('/', onlyUser, getHoas);

/**
 * Get all guards
 *
 * hoaId
 * guardId - optional
 */
router.get('/guards', allowEmployee, onlyEmployee, getGuards);

/**
 * Add new guards
 *
 * hoaId
 * userId
 */
router.post('/guards', allowEmployee, onlyAdmin, addGuard);

/**
 * Retire guard
 *
 * hoaId
 * guardId
 */
router.patch('/guards', allowEmployee, onlyAdmin, retireGuard);

module.exports = router;
