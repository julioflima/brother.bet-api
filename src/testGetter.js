process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const express = require('express')
const router = express.Router()
const axios = require('axios')
const https = require('https')

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

router.post("/", ((req, res) => {
    var result;
    if (req.query.funcRead === undefined) {
        result = req.body;
    } else {
        result = req.query;
    }
    let funcRead = result.funcRead;
    axios.post('https://187.19.164.236:9001/testRead',
        { 'funcRead': funcRead },
        {
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            }),
        }).then(response => {
            res.send(funcRead);
        }).catch(error => {
            console.log(error);
        });
}));
module.exports = router
