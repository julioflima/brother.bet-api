const express = require("express");

const app = express();
const port = 9001;

//Routers requires and calls.
app.use('/birds', require('./src/birds'))
app.use('/readable', require('./src/readable'))

app.get("/", (req, res) => {
    res.send("Hello te fode!")
});


// https.createServer(app).listen(port, () => {
//     console.log(`Server listening on port ${port}`)
// });

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});
