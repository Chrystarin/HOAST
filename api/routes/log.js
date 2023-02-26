const { addRecord, getRecords } = require('../controllers/logController');
const authorize = require('../middlewares/authorization');
const roles = require('../helpers/roles');

const router = require('express').Router();

/**
 * hoaId
 * logId - optional
 * logType - optional
 * fromDate - optional
 * toDate - optional
 */
router.get('/', authorize(roles.ADMIN, roles.GUARD), getRecords);

/**
 * hoaId
 * objId
 * logType
 */
router.post('/', authorize(roles.GUARD), addRecord);

module.exports = router;