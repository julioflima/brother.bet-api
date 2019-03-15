const express = require("express");

const app = express();
const port = 9001;

//Routers requires and calls.
app.use('/birds', require('./src/birds'))
app.use('/betfair', require('./src/betfair'))

app.get("/", (req, res) => {
    res.send("Hello te fode!")
});


https.createServer(options, app).listen(port);
