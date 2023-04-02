const router = require('express').Router();

const {
	allowEmployee,
	onlyAdmin,
	allowResident
} = require('../middlewares/authorization');
const asyncHandler = require('../middlewares/asyncHandler');

const { createDue, getDues } = asyncHandler(
	require('../controllers/dueController')
);

/**
 * Get dues
 */
router.get('/', allowEmployee, allowResident, getDues);

/**
 * Create a due
 *
 * homeId
 * amount
 * months
 */
router.post('/', allowEmployee, onlyAdmin, createDue);

module.exports = router;
