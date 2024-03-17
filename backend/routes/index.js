const express = require("express");
const router = express.Router();
const api = require('./api');

router.use('/api', api);

router.use(express.static('public'))

module.exports = router;