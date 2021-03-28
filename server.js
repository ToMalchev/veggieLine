const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

const port = 8080;

// get config vars
dotenv.config();

const app = express();

// use CORS-enabled for all origins
app.use(cors())
// parse requests of content-type: application/json
app.use(bodyParser.json({ limit: 50*1024*1024 }));

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true, limit: 50*1024*1024 }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to veggiline application." });
});
 
// app.get("/health", (req, res) => {
//   res.json({ message: "Welcome to health page." });
// });

require("./routes/blog.routes.js")(app);
require("./routes/login.routes.js")(app);
require("./routes/slogan.routes.js")(app);
require("./routes/category.routes.js")(app);

// set port, listen for requests
app.listen(port, () => {
  console.log("Server is running on port 8080.");
});
