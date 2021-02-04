const sql = require("./db.js");

// constructor
const Blog = function(Blog) {
  this.blog_id = Blog.blog_id;
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
      result(null, res.insert_id)
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

Blog.updateImageById = (id, imagePath, result) => {
  sql.query(
    "UPDATE Blog SET image = ? WHERE blog_id = ?",
    [imagePath, id],
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
      result(null, res.affectedRows);
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

Blog.search = (name, blog_ids, result) => {
  var search_query = "SELECT * FROM Blog";
  var search_by = " WHERE";

  if (blog_ids && blog_ids.length > 0) {
    search_by += " blog_id in (" + blog_ids + ")";
  }
  if (name && name != '') {
    let s_name = "'%" + name + "%'"
    search_by += " (title LIKE " + s_name + " OR description LIKE " + s_name + ")";
  }
  if (search_by != " WHERE"){

    search_query += search_by
  } 
  sql.query(search_query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

module.exports = Blog;

