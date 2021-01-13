const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const port = 8080;

const app = express();

// use CORS-enabled for all origins
app.use(cors())
// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to veggiline application." });
});
process.env.SECRETKEY = 'Mecho112'
process.env.accessTokenSecret = require('crypto').randomBytes(64).toString('hex');
 
// app.get("/health", (req, res) => {
//   res.json({ message: "Welcome to health page." });
// });

require("./routes/blog.routes.js")(app);
require("./routes/login.routes.js")(app);

// set port, listen for requests
app.listen(port, () => {
  console.log("Server is running on port 8080.");
});
