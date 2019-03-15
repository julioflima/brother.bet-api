const express = require("express");
var https = require('https');

const app = express();
const port = 9001;

//Routers requires and calls.
app.use('/birds', require('./src/birds'))
app.use('/betfair', require('./src/betfair'))

app.get("/", (req, res) => {
    res.send("Hello te fode!")
});


https.createServer(app).listen(port, () => {
    console.log(`Server listening on port ${port}`)
});
