var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "todorm",
  password: "1q2w3e4r5t"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});