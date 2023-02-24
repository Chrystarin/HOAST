const router = require('express').Router();
const { createDue, getDue, getDues } = require('../controllers/dueController');

router.post('/create', createDue);
router.get('/dues/:dueId', getDue);
router.get('/dues', getDues);

module.exports = router;
