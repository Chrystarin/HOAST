const router = require('express').Router();

const {
	allowAdmin,
	allowGuard,
	allowResident,
	notUser,
	allowHomeowner
} = require('../middlewares/authorization');
const asyncHandler = require('../middlewares/asyncHandler');

const { getResidents, addResident, removeResident } = asyncHandler(
	require('../controllers/residentController')
);

/**
 * Get residents of related home
 *
 * residentId
 *
 * [Employee]
 * hoaId
 *
 * [Resident]
 * homeId
 */
router.get('/', allowAdmin, allowGuard, allowResident, notUser, getResidents);

/**
 * Add residents of home
 *
 * homeId
 * residentId
 */
router.post('/', allowHomeowner, notUser, addResident);

/**
 * Set resident inactive
 *
 * homeId
 * residentId
 */
router.patch('/', allowHomeowner, notUser, removeResident);

module.exports = router;
