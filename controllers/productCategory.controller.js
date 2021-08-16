const blogCategory = require("../models/productCategory.model.js");

// Retrieve all Category from the database.
exports.getProductCategory = (req, res) => {
  Category.getProductCategory(req.query., (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Category."
      });
    else res.send(data);
  });
};
