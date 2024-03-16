const router = require('express').Router();
const api = require('./api');

router.use('/api', api);

router.use(express.static('public'))

module.exports = router;