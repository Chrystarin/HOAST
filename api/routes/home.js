const {
	getHomes,
	updateHomeName,
	getResidents,
	addResident,
	removeResident
} = require('../controllers/homeController');
const authorize = require('../middlewares/authorization');
const roles = require('../helpers/roles');

const router = require('express').Router();

/**
 * hoaId - optional
 * homeId - optional
 */
// router.get('/', authorize(roles.ADMIN, roles.HOMEOWNER), getHomes);
router.get('/', getHomes);

/**
 * homeId
 */
router.patch('/', authorize(roles.HOMEOWNER), updateHomeName);

/**
 * case 1: (HOA Admin)
 *     hoaId
 *     homeId - optional
 * case 2: (User)
 *     homeId
 */
// router.get('/residents', authorize(roles.ADMIN, roles.HOMEOWNER), getResidents);
router.get('/residents', getResidents);

/**
 * homeId
 * userId
 */
router.post('/residents', authorize(roles.HOMEOWNER), addResident);

/**
 * homeId
 * userId
 */
router.delete('/residents', authorize(roles.HOMEOWNER), removeResident);

module.exports = router;
