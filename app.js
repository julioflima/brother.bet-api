'use strict';

var express = require('express');
var app = express();

app.use('/', function (req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.end('Hello, World!\n\n💚 🔒.js');
})

// Don't do this:
// app.listen(3000)

// Do this instead:
module.exports = app;
