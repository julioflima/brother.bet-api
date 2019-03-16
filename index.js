'use strict';

// allow node.js to bind to port 80 and 443 without root:
//
//   sudo setcap 'cap_net_bind_service=+ep' `which node`

const LEX = require('letsencrypt-express');
const https = require('spdy');
const leConfDir = require('os').homedir() + '/letsencrypt/etc';
const EMAIL = 'julio@ilumini.em';

var lex = LEX.create({
  'configDir': leConfDir
  , approveRegistration: function (hostname, cb) { // leave `null` to disable automatic registration
    // Note: this is the place to check your database to get the user associated with this domain
    cb(null, {
      'domains': [hostname],
      'email': EMAIL, // user@example.com
      'agreeTos': true
    });
  }
});

(()=> {
  http.createServer(LEX.createAcmeResponder(lex, function redirectHttps(req, res) {
    res.setHeader('Location', 'https://' + req.headers.host + req.url);
    res.statusCode = 302;
    res.end('<!-- Hello Developer Person! Please use HTTPS instead -->');
  })).listen(80);
}).call()


(() => {
  const app = require('express')();
  const port = 9001;

  //Routers requires and calls.
  app.use('/birds', require('./src/birds'))
  app.use('/readable', require('./src/readable'))
  app.use('/testGetter', require('./src/testGetter'))

  app.get("/", (req, res) => {
    res.send("Hello te fode!")
  });

  console.log(`The server listening port: ${port}`)
  https.createServer(lex.httpsOptions, LEX.createAcmeResponder(lex, app)).listen(port, () => {
    console.log(`Server listening on port ${port}`)
  });
}).call();
