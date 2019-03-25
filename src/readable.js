const betfair = require('betfair');
const async = require('async');
const express = require('express')
var session;

//Declarations.
var router = express.Router()

//Define the home page route.
module.exports = router.post("/", ((req1, res1) => {
    res1.set("Access-Control-Allow-Origin", "*");
    var handler = function (cb) {
        var email = req1.query.email
        var password = req1.query.password
        var apiKey = req1.query.apiKey
        var require = req1.query.funcRead
        var filtered = JSON.parse(req1.query.filter.split('/r').join('/'))
        var filtered = JSON.parse(filtered.split('/r').join('/'))
        var lang = req1.query.locale || `en`;
        session = new betfair.BetfairSession(apiKey);
        async.series([
            function (callback) {
                console.log(email,password,apiKey)
                session.login(email, password, function (err, res) {
                    console.log(err ? "Login failed " + err : "Login OK ");
                    callback(err, res);
                });
            },
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