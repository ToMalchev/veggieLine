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


exports.create = (req, res) => {
  console.log(req.body)
  console.log("msadklamlkdnmaskldmlakmdklamd")
  Category.create(req.body.category.name, (err, data) =>{
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Slogan."
      });
      return
    }
    res.status(200).send({message: "Successfuly created Slogan"})
  });
};

exports.update = (req, res) => {
   if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  let name = req.body.category.name;
  let category_id = req.body.category.category_id;
  Category.update(
    category_id,
    name,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Category with id ${category_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Category with id " + category_id
          });
        }
      } else {
        exports.findAll(req, res);
        // res.send(data);
      }
    }
  );
};

exports.delete = (req, res) => {
  Category.remove(req.body.category.category_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Slogan with id ${req.body.category_id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Slogan with id " + req.body.category_id
        });
      }
    } else {
      exports.findAll(req, res);
    }
  });
};