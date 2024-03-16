const express = require("express");
const router = express.Router();
router.get("/status", (request, response) => {
    const status = {
       "Status": "Running"
    };
    
    response.send(status);
});
router.get("/ping", (request, response) => {
    const status = {
       "Status": "Running"
    };
    
    response.send(status);
});
module.exports = router;