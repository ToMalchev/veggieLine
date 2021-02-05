const Category = require("../models/category.model.js");

// Retrieve all Category from the database.
exports.findAll = (req, res) => {

  Category.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Category."
      });
    } else {
      res.send(data);
    }
  });
};
