const router = require('express').Router();
const {
	addVisitor,
	getVisitor,
	getVisitors
} = require('../controllers/visitorController');

router.post('/add', addVisitor);
router.get('/:visitorId', getVisitor);

module.exports = router;
