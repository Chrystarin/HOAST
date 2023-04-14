const router = require('express').Router();

const asyncHandler = require('../middlewares/asyncHandler');
const {
	allowResident,
	notUser,
	allowGuard,
    allowAdmin
} = require('../middlewares/authorization');

const { addVisitor, getVisitors } = asyncHandler(
	require('../controllers/visitorController')
);

/**
 * Create a visitor
 *
 * name
 * purpose
 * arrivalDate
 * departureDate
 * note
 */
router.post('/', allowResident, notUser, addVisitor);

/**
 * Get visitors
 *
 * visitorId - optional [1 | n]
 *
 * [Employee]
 * hoaId
 *
 * [Resident]
 * homeId
 */
router.get('/', allowAdmin, allowGuard, allowResident, getVisitors);

module.exports = router;
