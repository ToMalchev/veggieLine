const sql = require("./db.js");
const BlogCategory = require("./blogCategory.model.js");

// constructor
const Blog = function(Blog) {
  this.blog_id = Blog.blog_id;
  this.title = Blog.title;
  this.content = Blog.content;
  this.image = Blog.image;
  this.user_id = Blog.user_id;
  this.categories = Blog.categories;
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
  let sql_query = "SELECT distinct (b.blog_id),"
+"                b.title,"
+"                b.content,"
+"                b.image,"
+"                b.description,"
+"                CONCAT('[', categoryTable.res, ']') as categories"
+"  FROM Blog b,"
+"       Category c,"
+"       BlogCategory bc,"
+"       (SELECT bb.blog_id,"
+"               GROUP_CONCAT(CONCAT('{category_id:',"
+"                                   cc.category_id,"
+"                                   ',name:',"
+"                                   cc.name,"
+"                                   '}') SEPARATOR ', ') AS res"
+"          FROM Category     cc,"
+"               Blog         bb,"
+"               BlogCategory bcc"
+"         WHERE cc.category_id = bcc.category_id"
+"           AND bb.blog_id = bcc.blog_id"
+"         group by bb.blog_id) as categoryTable"
+" WHERE b.blog_id = bc.blog_id"
+"   AND c.category_id = bc.category_id"
+"   AND categoryTable.blog_id = b.blog_id"
+"   AND (b.title LIKE '%Pisanici%' OR b.description LIKE '%Pisanici%')"
+"   AND b.blog_id IN (SELECT blog_id FROM BlogCategory WHERE category_id IN (2));";
  sql.query(sql_query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    };
    result(null, res);
  });
};

Blog.getLimited = (limit, result) => {
  sql.query("SELECT * FROM Blog ORDER BY 'created_at' LIMIT ?", [limit], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, res);
  });
};

Blog.create = (Blog, result) => {
  delete Blog.categories;
  sql.query(
    "INSERT INTO Blog SET ?",
    Blog, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log(res);
      result(null, res.insertId);
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
        result(err, null);
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
        result(err, null);
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
      result(err, null);
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
      result(err, null);
      return;
    }

    result(null, res);
  });
};

Blog.search = (name, category_ids, result) => {

let query_1 = "SELECT distinct (b.blog_id),"
+"                b.title,"
+"                b.content,"
+"                b.image,"
+"                b.description,"
+"                CONCAT('[', categoryTable.res, ']') as categories"
+"  FROM Blog b,"
+"       Category c,"
+"       BlogCategory bc,"
+"       (SELECT bb.blog_id,"
+"               GROUP_CONCAT(CONCAT('{category_id:',"
+"                                   cc.category_id,"
+"                                   ',name:',"
+"                                   cc.name,"
+"                                   '}') SEPARATOR ', ') AS res"
+"          FROM Category     cc,"
+"               Blog         bb,"
+"               BlogCategory bcc"
+"         WHERE cc.category_id = bcc.category_id"
+"           AND bb.blog_id = bcc.blog_id"
+"         group by bb.blog_id) as categoryTable"
+" WHERE b.blog_id = bc.blog_id"
+"   AND c.category_id = bc.category_id"
+"   AND categoryTable.blog_id = b.blog_id";

  let query_2 = name? ` AND (b.title like '%${name}%' OR b.description like '%${name}%')`:"";
  let query_3 = (category_ids && category_ids.length >0 && category_ids[0]!='')? ` AND b.blog_id IN (SELECT blog_id FROM BlogCategory WHERE category_id IN (${category_ids}));`: ";";

  let final_query = query_1 + query_2 + query_3;
  sql.query(final_query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

module.exports = Blog;

