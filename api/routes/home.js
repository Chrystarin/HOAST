const router = require('express').Router();

const asyncHandler = require('../middlewares/asyncHandler');
const {
	allowResident,
	allowHomeowner,
	notUser,
	allowAdmin,
	allowGuard
} = require('../middlewares/authorization');

const { getHomes, updateHome, addResident, removeResident, getResidents } =
	asyncHandler(require('../controllers/homeController'));

/**
 * Get homes
 *
 * homeId - optional [one | many]
 *
 * [User] - owned homes
 *
 * [Employee]
 * hoaId
 */
router.get('/', allowAdmin, allowGuard, getHomes);

/**
 * Update home details
 *
 * homeId
 */
router.patch('/', allowHomeowner, notUser, updateHome);

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
router.get(
	'/residents',
	allowAdmin,
	allowGuard,
	allowResident,
	notUser,
	getResidents
);

/**
 * Add residents of home
 *
 * homeId
 * residentId
 */
router.post('/residents', allowHomeowner, notUser, addResident);

/**
 * Set resident inactive
 *
 * homeId
 * residentId
 */
router.patch('/residents', allowHomeowner, notUser, removeResident);

module.exports = router;
