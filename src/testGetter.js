var express = require('express')
var router = express.Router()
const request = require('request');
const cheerio = require('cheerio');


// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

router.post("/", ((req, res) => {

    res.set("Access-Control-Allow-Origin", "*");
    var result;
    if (req.query.funcRead === undefined) {
        result = req.body;
    } else {
        result = req.query;
    }
    let funcRead = result.funcRead;
    console.log(funcRead);
    const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9';
    let options = {
        url: 'http://187.19.164.236:9001/readable',
        method: 'POST',
        headers: {
            'User-Agent': userAgent,
            'accept': 'application/json'
        },
        data: {
            'funcRead': "listEvents"
        },
        transports: ['websocket'], pingTimeout: 3000, pingInterval: 5000
    };

    request(options, (error, response, html) => {
        if (!error) {
            page = cheerio.load(html);
            dataReceived = JSON.parse(page.text());
            res.send(dataReceived);
        } else {
            console.log(error, response, html);
            res.send(error, response, html);
        }
    });
}));

module.exports = router
