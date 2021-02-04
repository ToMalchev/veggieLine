const sql = require("./db.js");

// constructor
const BlogCategory = function(BlogCategory) {
  this.category_id = BlogCategory.category_id;
  this.blog_id = BlogCategory.blog_id;
};

BlogCategory.getBlogCategory = (category_ids, result) => {
  sql.query("SELECT * FROM BlogCategory WHERE category_id IN (?)", [category_ids], (err, res) => {
  	console.log(category_ids)
  	console.log(res)
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.lenght) {
      result(null, res);
      return;
    }
    result(null, null);
  });
};

module.exports = BlogCategory;