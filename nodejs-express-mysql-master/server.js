const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://127.0.0.1:5173"
};

app.use(cors(corsOptions));


// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false })); /* bodyParser.urlencoded() is deprecated */

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Deadline Bird." });
});

require("./app/routes/tutorial.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
