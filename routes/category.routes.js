module.exports = app => {

  const category = require("../controllers/category.controller.js");
  const verify = require('../middleware/login.js');

  // Categories
  app.get("/categories", category.findAll);
  app.post("/category/add", category.create);
  app.post("/category/update", verify.authenticateJWT, category.update);
  app.post("/category/delete", verify.authenticateJWT, category.delete);

};