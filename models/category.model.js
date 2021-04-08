const sql = require("./db.js");

const Category = function(Category) {
  this.category_id = Category.category_id;
  this.category_title = Category.blog_title;
};

Category.getAll = result => {
  sql.query("SELECT * FROM Category", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    return result(null, res);
  });
};

Category.create = (category, result) => {
  sql.query(
    "INSERT INTO Category (name) VALUES (?)",
    [category], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, res.insert_id)
    }
  );
};


Category.remove = (id, result) => {
  sql.query("DELETE FROM Category WHERE category_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Category with the id
      result({ kind: "not_found" }, null);
      return;
    }

    result(null, res);
  });
};

Category.update = (id, name, result) => {
  sql.query(
    "UPDATE Category SET name=? WHERE category_id = ?",
    [name, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Category with the id
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { id: id, Category });
    }
  );
};


module.exports = Category;