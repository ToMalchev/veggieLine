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

// Category.create = (req, res) => {


// };

module.exports = Category;