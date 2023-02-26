const router = require('express').Router();
const { addVisitor, getVisitors } = require('../controllers/visitorController');

/**
 * homeId
 * name
 * purpose
 * arrivalDate
 * departureDate
 * note
 */
router.post('/', addVisitor);

/**
 * hoaId
 * homeId - optional
 * visitorId - optional
 */
router.get('/', getVisitors);

module.exports = router;
