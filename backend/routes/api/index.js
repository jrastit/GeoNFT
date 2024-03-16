const express = require('express');

const router = express.Router();

const status = require('./status');

router.use('/', status);

router.get("/", (request, response) => {
    const status = {
       "Api": "Running"
    };
    
    response.send(status);
});

module.exports = router;