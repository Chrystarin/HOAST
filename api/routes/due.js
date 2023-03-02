const router = require('express').Router();
const { createDue, getDues } = require('../controllers/dueController');
const authorize = require('../middlewares/authorization');
const roles = require('../helpers/roles');

/**
 * case ADMIN:
 *     hoaId
 *     homeId
 * case RESIDENT:
 *     homeId
 * 
 * from - optional
 * to - optional
 */
router.get('/', getDues);

/**
 * [ADMIN]
 *
 * hoaId
 * homeId
 * amount
 * paidUntil
 */
router.post('/', createDue);

module.exports = router;
