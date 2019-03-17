const express = require('express')

//Declarations.
var router = express.Router()

//Define the home page route.
router.post("/", ((req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    var result;
    if (req.query.funcRead === undefined) {
        result = req.body;
    } else {
        result = req.query;
    }
    let funcRead = result.funcRead;
    res1.send(funcRead);
}));

module.exports = router