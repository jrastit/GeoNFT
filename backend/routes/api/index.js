const express = require('express');

const router = express.Router();

const status = require('./status');

const nft = require('./nft');

router.use('/', status);
router.use('/nft', nft);

router.get("/", (request, response) => {
    const status = {
       "Api": "Running"
    };
    
    response.send(status);
});

module.exports = router;