const sql = require("./db.js");

Blog.getAll = result => {
  sql.query("SELECT * FROM Category", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    return res;
  });
};