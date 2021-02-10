const sql = require("./db.js");

// constructor
const BlogCategory = function(BlogCategory) {
  this.category_id = BlogCategory.category_id;
  this.blog_id = BlogCategory.blog_id;
};

BlogCategory.getBlogCategory = function (category_ids) {
  sql.query("SELECT * FROM BlogCategory WHERE category_id IN (?)", [category_ids], function (err, res) {
  	console.log("daldlknalkdnakdnkjanda")
  	console.log(category_ids)
  	console.log(res)
  	console.log(res.length)
    if (err) {
      console.log("error: ", err);
      return err;
    }
    // if (res.lenght > 0) {
    //   console.log("sajsa")
    //   console.log(res)
    //   // result(null, res);
    //   return res;
    // }
    console.log('kur')
    return res
    // result(null, null);
  }).then();
};

module.exports = BlogCategory;