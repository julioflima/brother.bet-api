const betfair = require('betfair');
const async = require('async');
const express = require('express')
const security = require('./security');
const session = new betfair.BetfairSession(security.apiKey);

//Declarations.
var router = express.Router()

//Define the home page route.
module.exports = router.post("/", ((req1, res1) => {
    var handler = function (cb) {
        var require = req1.query.funcRead
        async.series([
            login,
            keepAlive,
            function (callback) {
                session[require]({ filter: {} }, function (err, res) {
                    if (err) {
                        console.log('listCountries has  failed');
                    } else {
                        callback(null, res);
                    }
                });
            },logout
        ], function (error, results) {
            cb(error, results)
        });
    }
    handler(function (err, results) {
        if (!err) {
            console.log(results);
            res1.send(results);
        }else{
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

function getReadable(funcRead, callback) {
    session[require]({ filter: {} }, function (err, res) {
        if (err) {
            console.log('listCountries failed');
        } else {
            callback(null, res);
        }
    });
}