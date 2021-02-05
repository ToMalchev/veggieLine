module.exports = app => {

  const category = require("../controllers/category.controller.js");

  // get Categories
  app.get("/categories", category.findAll);

};