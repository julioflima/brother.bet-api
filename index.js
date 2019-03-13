const express = require("express");

const app = express();
const port = 9001;

//Routers requires and calls.
app.use('/birds', require('./src/birds'))

app.get("/", (req, res) => {
    res.send("Hello te fode!")
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});