const router = require('express').Router();

const asyncHandler = require('../middlewares/asyncHandler');
const {
	allowEmployee,
	onlyGuard,
	allowResident
} = require('../middlewares/authorization');

const { addRecord, getRecords } = asyncHandler(
	require('../controllers/logController')
);

/**
 * Admin, Guard
 * - vehicle
 * - visitor
 * - user
 *
 * User
 * - vehicle
 * - user
 *
 * Residents of Home
 * - visitor
 *
 * hoaId
 * logId - optional
 * logType - optional
 * fromDate - optional
 * toDate - optional
 */
router.get('/', allowEmployee, allowResident, getRecords);

/**
 * hoaId
 * objId
 * logType
 */
router.post('/', allowEmployee, onlyGuard, addRecord);

module.exports = router;
