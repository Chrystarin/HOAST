const {
	createRequest,
	getRequests,
	processRequest
} = require('../controllers/requestController');
const roles = require('../helpers/roles');
const authorization = require('../middlewares/authorization');

const router = require('express').Router();

/**
 * hoaId = optional
 * requestId - optional
 */
router.get('/', authorization(roles.ADMIN, roles.SELF), getRequests);

/**
 * hoaId
 * homeName
 * houseNumber
 * street
 * phase - optional
 */
router.post('/', createRequest);

/**
 * requestId
 * status
 */
router.patch('/', authorization(roles.ADMIN), processRequest);

module.exports = router;
