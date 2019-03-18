const betfair = require('betfair');
const async = require('async');
const express = require('express')
const security = require('./security');
const session = new betfair.BetfairSession(security.apiKey);

//Declarations.
var router = express.Router()

//Define the home page route.
module.exports = router.post("/", ((req1, res1) => {
    res1.set("Access-Control-Allow-Origin", "*");
    var handler = function (cb) {
        var require = req1.query.funcRead
        var filtered = JSON.parse(req1.query.filter.split('/r').join('/'))
        var filtered = JSON.parse(filtered.split('/r').join('/'))
        var lang = req1.query.locale || `en`;
        async.series([
            login,
            keepAlive,
            function (callback) {
                session[require]({ filter: filtered, locale: lang },
                    function (err, res) {
                        if (err) {
                            console.log(`${require} has  failed`);
                        } else {
                            callback(null, res);
                        }
                    });
            }, logout
        ], function (error, results) {
            cb(error, results)
        });
    }

    handler(function (err, results) {
        if (!err) {
            // console.log(results);
            res1.send(results);
        } else {
            console.log(err);
        }
    })
}));

function login(callback) {
    session.login(security.user, security.password, function (err, res) {
        console.log(err ? "Login failed " + err : "Login OK ");
        callback(err, res);
    });
}

function keepAlive(callback) {
    session.keepAlive(function (err, res) {
        console.log(err ? "Keep Alive failed " + err : "Keep Alive OK");
        callback(err, res);
    });
}

function logout(callback) {
    session.logout(function (err, res) {
        console.log(err ? "Logout failed " + err : "Logout OK");
        callback(err, res);
    });
}