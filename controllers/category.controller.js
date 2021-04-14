const Category = require("../models/category.model.js");
const errorHandlers = require("../base/errorHandler.js")

const type = 'Category';

// Retrieve all Category from the database.
exports.findAll = (req, res) => {
  Category.getAll((err, data) => {
   let handleData = errorHandlers.baseCR(err, data, type, 'retrieving');
   log('11111111')
   log(handleData[status])
   log('22222222222')
   log(handleData[data])
   res.status(handleData[status]).send(handleData[data]);
  });
};


exports.create = (req, res) => {
  Category.create(req.body.category, (err, data) =>{
    let handleData = errorHandlers.baseCR(err, data, type, 'creating');
    res.status(handleData[status]).send(handleData[data]);
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
      let handleData = errorHandlers.baseCR(err, data, type, 'updating');
      if (handleData[status] === 200) {
        exports.findAll(req, res);
      } else {
        res.status(handleData[status]).send(handleData[data]);
      };
    }
  );
};

exports.delete = (req, res) => {
  console.log(req.body)
  Category.remove(req.body.category.category_id, (err, data) => {
    let handleData = errorHandlers.baseCR(err, data, type, 'updating');
      if (handleData[status] === 200) {
        exports.findAll(req, res);
      } else {
        res.status(handleData[status]).send(handleData[data]);
      };
  });
};