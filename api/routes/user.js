const router = require('express').Router();
const { createUser, editUser } = require('../controllers/userController');

router.post('/create', createUser);
router.put('/edit', editUser);

module.exports = router;