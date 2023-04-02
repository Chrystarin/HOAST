const router = require('express').Router();

const asyncHandler = require('../middlewares/asyncHandler');
const {
	allowEmployee,
	onlyUser,
	onlyAdmin
} = require('../middlewares/authorization');

const { createRequest, getRequests, processRequest } = asyncHandler(
	require('../controllers/requestController')
);

/**
 * hoaId
 * requestId - optional
 */
router.get('/', allowEmployee, getRequests);

/**
 * Create request
 *
 * hoaId
 * homeName
 * houseNumber
 * street
 * phase - optional
 */
router.post('/', onlyUser, createRequest);

/**
 * Process the request
 *
 * requestId
 * status
 */
router.patch('/', allowEmployee, onlyAdmin, processRequest);

module.exports = router;
