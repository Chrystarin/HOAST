const router = require('express').Router();

const asyncHandler = require('../middlewares/asyncHandler');
const {
	allowResident,
	onlyHomeowner,
	allowEmployee,
	inHoa
} = require('../middlewares/authorization');

const { getHomes, updateHome, addResident, removeResident, getResidents } =
	asyncHandler(require('../controllers/homeController'));

/**
 * Get homes
 *
 * homeId - optional [one | many]
 */
router.get('/', allowEmployee, allowResident, getHomes);

/**
 * Update home details
 *
 * homeId
 */
router.patch('/', allowResident, onlyHomeowner, updateHome);

/**
 * Get residents of related home
 *
 * homeId
 */
router.get('/residents', allowResident, allowEmployee, inHoa, getResidents);

/**
 * Add residents for home
 *
 * homeId
 * userId
 */
router.post('/residents', allowResident, onlyHomeowner, addResident);

/**
 * Remove resident (set inactive)
 *
 * homeId
 * userId
 */
router.delete('/residents', allowResident, onlyHomeowner, removeResident);

module.exports = router;
