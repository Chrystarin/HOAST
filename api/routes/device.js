const router = require('express').Router();

const { addDevice } = asyncHandler(require('../controllers/deviceController'));

router.post('/', addDevice);

module.exports = router;
