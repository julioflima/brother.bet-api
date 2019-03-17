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
    var require = req.query.funcRead
    var filtered = JSON.stringify(req.query.filter)
    var lang = req.query.locale
    var hereURL = `https://127.0.0.1:9001/readable?funcRead=${require}&filter=${filtered}&locale=${lang}`;
    var thereURL = `https://187.19.164.236:9001/readable?funcRead=${require}&filter=${filtered}&locale=${lang}`;
    axios.post(hereURL, {
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        }),
    }).then(response => {
        res.send(response.data);
    }).catch(error => {
        console.log(error);
    });
}));
module.exports = router
