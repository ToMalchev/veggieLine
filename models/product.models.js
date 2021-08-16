const sql = require("./db.js");
const ProductCategory = require("./productCategory.model.js");

// constructor
const Product = function(Product) {
  this.product_id = Product.product_id;
  this.title = Product.title;
  this.content = Product.content;
  this.description = product.description;
  this.image = Product.image;
  this.user_id = Product.user_id;
  this.categories = Product.categories;
};

const base_query = 'SELECT DISTINCT (b.product_id), b.title, b.content, b.image, b.description, categoryTable.res as categories'
+'  FROM product b,'
+'       Category c,'
+'       productCategory bc,'
+'       (SELECT bb.product_id,'
+'               GROUP_CONCAT(CONCAT("category_id:",'
+'                                   cc.category_id,'
+'                                   ",name:",'
+'                                   cc.name)'
+'                                   SEPARATOR "; ") AS res'
+'          FROM Category     cc,'
+'               product         bb,'
+'               productCategory bcc'
+'         WHERE cc.category_id = bcc.category_id'
+'           AND bb.product_id = bcc.product_id'
+'         group by bb.product_id) as categoryTable'
+' WHERE b.product_id = bc.product_id'
+'   AND c.category_id = bc.category_id'
+'   AND categoryTable.product_id = b.product_id';

const baseQuery = (name, category_ids) => {
  let query_2 = name? ` AND (b.title like '%${name}%' OR b.description like '%${name}%')`:"";
  let query_3 = (category_ids && category_ids.length >0 && category_ids[0]!='')? ` AND b.product_id IN (SELECT product_id FROM productCategory WHERE category_id IN (${category_ids}))`: "";
  let query = base_query + query_2 + query_3;
  return query;
};

product.findById = (productId, result) => {

  let query_extra = ` AND b.product_id = ${productId}`;
  let query = base_query + query_extra;
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res);
      return;
    }

    // not found product with the id
    result({ kind: "not_found" }, null);
  });
};

product.getAll = result => {
  console.log('asasasa')
  sql.query(base_query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    };
    result(null, res);
  });
};

product.getLimited = (limit, result) => {
  let query_extra = ` ORDER BY "created_at" LIMIT ${limit}`
  let query = base_query + query_extra
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, res);
  });
};

product.create = (product, result) => {
  delete product.categories;
  sql.query(
    "INSERT INTO product SET ?",
    product, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log(res)
      result(null, res.insertId);
    }
  );
};

product.updateById = (id, product, result) => {
  sql.query(
    "UPDATE product SET title = ?, content = ?, description = ? WHERE product_id = ?",
    [product.title, product.content, product.description, id],
    (err, res) => {
      console.log(res)
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        // not found product with the id
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { id: id, product });
    }
  );
};

product.updateImageById = (id, imagePath, result) => {
  sql.query(
    "UPDATE product SET image = ? WHERE product_id = ?",
    [imagePath, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log(res);
      console.log('jasnakjnsjkansjknasjkasnkjanskja')
      if (res.affectedRows == 0) {
        // not found product with the id
        result("not found", null);
        return;
      }
      result(null, res.affectedRows);
    }
  );
};

product.remove = (id, result) => {
  sql.query("DELETE FROM product WHERE product_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found product with the id
      result({ kind: "not_found" }, null);
      return;
    }

    result(null, res);
  });
};

product.removeAll = result => {
  sql.query("DELETE FROM products", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, res);
  });
};

product.search = (name, category_ids, offset, result) => {

  let query = baseQuery(name, category_ids);
  let query_order = ` ORDER BY title LIMIT 4 OFFSET ${offset};`

  let final_query = query + query_order;
  sql.query(final_query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    product.count(name, category_ids, (err_1, res_1) => {
      if (err_1) {
        console.log("error: ", err_1);
        result(err_1, null);
        return;
      }
      let new_res = {products: res, count: res_1};
      result(null, new_res);
    });
  });
};

product.count = (name, category_ids, result) => {
  let query = baseQuery(name, category_ids) + ";";
  query = query.replace("DISTINCT (b.product_id), b.title, b.content, b.image, b.description, categoryTable.res as categories", "COUNT(DISTINCT b.product_id)");
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res[0]["COUNT(DISTINCT b.product_id)"]);
  });
};

module.exports = product;

