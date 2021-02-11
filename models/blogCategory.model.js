const sql = require("./db.js");

// constructor
const BlogCategory = function(BlogCategory) {
  this.category_id = BlogCategory.category_id;
  this.blog_id = BlogCategory.blog_id;
};

BlogCategory.getBlogCategory = (category_ids) => {
  return sql.query("SELECT * FROM BlogCategory WHERE category_id IN (?)", [category_ids], function (err, res) {
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

BlogCategory.getByBlogId = (blog_id, result) => {
	sql.query('SELECT c.category_id, c.name FROM BlogCategory bc, Category c WHERE blog_id = ? AND c.category_id=bc.category_id', blog_id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, res);
	});
};

BlogCategory.create = ([values], result) => {
	sql.query('INSERT INTO BlogCategory (blog_id, category_id) VALUES (?, ?)', values, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, res);
    });
};

module.exports = BlogCategory;