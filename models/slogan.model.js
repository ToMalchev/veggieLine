const sql = require("./db.js");

// constructor
const Slogan = function(Slogan) {
  this.slogan_id = Slogan.Slogan_id;
  this.name = Slogan.name;
};
  
Slogan.getSloganList = (result) => {
  sql.query(`SELECT * FROM Slogan`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    if (res) {
      result(null, res);
      return;
    }
    // Slogans not found
    result({ kind: "Problem with returning slogans!" }, null);
  });
};

Slogan.create = (slogan, result) => {
  console.log(slogan)
  sql.query(
    "INSERT INTO Slogan (name) VALUES (?)",
    slogan, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      result(null, res.insert_id)
    }
  );
};

module.exports = Slogan;