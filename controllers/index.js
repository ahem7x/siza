var express = require('express')
var router = express.Router();

router.use('/org', require('./org'));
router.use('/proxy', require('./proxyApi'));

module.exports = router;