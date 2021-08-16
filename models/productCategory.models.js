const sql = require("./db.js");

// constructor
const ProductCategory = function(ProductCategory) {
  this.category_id = ProductCategory.category_id;
  this.product_id = ProductCategory.product_id;
};

ProductCategory.getProductCategory = (category_ids) => {
  return sql.query("SELECT * FROM ProductCategory WHERE category_id IN (?)", [category_ids], function (err, res) {
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
    return res
    // result(null, null);
  }).then();
};

ProductCategory.getByProductId = (product_id, result) => {
	sql.query('SELECT c.category_id, c.name FROM ProductCategory bc, Category c WHERE product_id = ? AND c.category_id=bc.category_id', product_id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null)
        return;
      }
        result(null,res);
	});
};

ProductCategory.create = (values, result) => {
	sql.query('INSERT INTO ProductCategory (product_id, category_id) VALUES ?', [values], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, res);
    });
};

module.exports = ProductCategory;