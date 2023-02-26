const router = require('express').Router();
const { createDue, getDues } = require('../controllers/dueController');
const authorize = require('../middlewares/authorization');
const roles = require('../helpers/roles');

/**
 * hoaId
 * homeId
 * from - optional
 * to - optional
 */
router.get('/', authorize(roles.ADMIN), getDues);

/**
 * hoaId
 * homeId
 * amount
 * paidUntil
 */
router.post('/', authorize(roles.ADMIN), createDue);

module.exports = router;