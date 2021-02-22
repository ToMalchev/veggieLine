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
        result(err, null);
        return;
      }
      result(null, res.insert_id)
    }
  );
};

Slogan.remove = (id, result) => {
  sql.query("DELETE FROM Slogan WHERE slogan_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Slogan with the id
      result({ kind: "not_found" }, null);
      return;
    }

    result(null, res);
  });
};

Slogan.update = (id, name, result) => {
  sql.query(
    "UPDATE Slogan SET name=? WHERE slogan_id=?",
    [name, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Slogan with the id
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { id: id, Slogan });
    }
  );
};



module.exports = Slogan;