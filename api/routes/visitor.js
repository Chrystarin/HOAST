const router = require('express').Router();
const { addVisitor, getVisitors } = require('../controllers/visitorController');

/**
 * [RESIDENT]
 * 
 * homeId
 * name
 * purpose
 * arrivalDate
 * departureDate
 * note
 */
router.post('/', addVisitor);

/**
 * [ADMIN, GUARD, RESIDENT]
 * 
 * case ADMIN
 *     hoaId
 *     homeId - optional
 *     visitorId - optional
 * case RESIDENT
 *     homeId
 *     visitorId - optional
 */
router.get('/', getVisitors);

module.exports = router;
