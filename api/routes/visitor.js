const router = require('express').Router();

const asyncHandler = require('../middlewares/asyncHandler');
const {
	allowResident,
	onlyHomeResident,
	allowEmployee,
	inHoa
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
router.post('/', allowResident, onlyHomeResident, addVisitor);

/**
 * Get residents
 *
 * visitorId - optional [one | many]
 */
router.get('/', allowEmployee, allowResident, inHoa, getVisitors);

module.exports = router;
