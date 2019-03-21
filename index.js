const app = require('express')();
const fs = require('fs')
const https = require('https')
const port = 9001;

//Routers requires and calls.
app.use('/birds', require('../functions/routers/test/birds'))
app.use('/readable', require('./routers/readable'))
app.use('/testRead', require('../functions/routers/betfair/testRead'))
app.use('/testGetReadable', require('../functions/routers/test/getReadable'))

app.get("/", (req, res) => {
  res.send("Hello to Brother Bet API!")
});

https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app)
  .listen(port, () => {
    console.log(`Server listening on port ${port}`)
  });

// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`)
// });