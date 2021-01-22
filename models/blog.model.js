const sql = require("./db.js");

// constructor
const Blog = function(Blog) {
  this.title = Blog.title;
  this.content = Blog.content;
  this.image = Blog.image;
  this.blog_category_id = Blog.blog_category_id
  this.user_id = Blog.user_id
};

  

Blog.findById = (BlogId, result) => {
  sql.query(`SELECT * FROM Blog WHERE blog_id = ${BlogId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    // not found Blog with the id
    result({ kind: "not_found" }, null);
  });
};

Blog.getAll = result => {
  sql.query("SELECT * FROM Blog", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};

Blog.getLimited = (limit, result) => {
  sql.query("SELECT * FROM Blog ORDER BY 'created_at' LIMIT ?", [limit], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};

Blog.create = (Blog, result) => {
  console.log(Blog)
  sql.query(
    "INSERT INTO Blog SET ?",
    Blog, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      // if (res.affectedRows == 0) {
      //   // not found Blog with the id
      //   result({ kind: "not_found" }, null);
      //   return;
      // }

      // console.log("updated Blog: ", { id: id, ...Blog });
      result(null, Blog)
    }
  );
};

Blog.updateById = (id, Blog, result) => {
  sql.query(
    "UPDATE Blog SET title = ?, content = ?, image = ? WHERE blog_id = ?",
    [Blog.email, Blog.name, Blog.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Blog with the id
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, { id: id, ...Blog });
    }
  );
};

Blog.remove = (id, result) => {
  sql.query("DELETE FROM Blogs WHERE blog_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Blog with the id
      result({ kind: "not_found" }, null);
      return;
    }

    result(null, res);
  });
};

Blog.removeAll = result => {
  sql.query("DELETE FROM Blogs", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};

module.exports = Blog;
