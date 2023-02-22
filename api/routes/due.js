const router = require('express').Router();
const { createDue } = require('../controllers/dueController');

router.post('/create', createDue);

module.exports = router;