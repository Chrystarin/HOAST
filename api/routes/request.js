const {
	createRequest,
	getRequests,
	processRequest
} = require('../controllers/requestController');
const roles = require('../helpers/roles');
const authorization = require('../middlewares/authorization');

const router = require('express').Router();

/**
 * hoaId
 * requestId - optional
 */
// router.get('/', authorization(roles.ADMIN), getRequests);
router.get('/', getRequests);

/**
 * hoaId
 * homeName
 * houseNumber
 * street
 * phase - optional
 */
router.post('/', createRequest);

/**
 * hoaId
 * requestId
 * status
 */
// router.patch('/', authorization(roles.ADMIN), processRequest);
router.patch('/', processRequest);

module.exports = router;
