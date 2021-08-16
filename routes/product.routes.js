module.exports = app => {
  const product = require("../controllers/product.controller.js");
  const upload = require("../controllers/upload.controller.js");
  const verify = require('../middleware/login.js');

  // Create a new product
  app.post("/product/add", verify.authenticateJWT, product.create);

  // Retrieve all products
  app.get("/products", product.findAll);

  // Retrieve last two products
  app.get("/products/latest", product.findLimited);

  // Retrieve a single product with customerId
  app.get("/product", product.findOne);

  // Update a product with customerId
  app.post("/product/update", verify.authenticateJWT, product.update);

  // Delete a product with customerId
  app.post("/product/delete", verify.authenticateJWT, product.delete);

  // Delete all products
  // app.post("/products/delete", verify.authenticateJWT, product.deleteAll);

  // Upload product image
  app.post("/product/image", verify.authenticateJWT, upload.uploadImage);

  app.get("/product/search", product.search);
};