var router = require('express').Router();
var user = require('../api/user.api');

router.get('/', user.index);

module.exports = router;