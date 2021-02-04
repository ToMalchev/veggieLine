const sql = require("./db.js");

// constructor
const BlogCategory = function(BlogCategory) {
  this.category_id = BlogCategory.category_id;
  this.blog_id = BlogCategory.blog_id;
};

BlogCategory.getBlogCategory = (category_ids, result) => {
  sql.query("SELECT * FROM BlogCategory WHERE category_id in (?)", [category_ids], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

module.exports = BlogCategory;