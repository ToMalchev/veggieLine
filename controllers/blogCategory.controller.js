const blogCategory = require("../models/blogCategory.model.js");

// Retrieve all Category from the database.
exports.getBlogCategory = (req, res) => {
  Category.getBlogCategory(req.query., (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Category."
      });
    else res.send(data);
  });
};
