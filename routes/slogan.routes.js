module.exports = app => {

  const slogan = require("../controllers/slogan.controller.js");
  const verify = require('../middleware/login.js');

  // Slogan
  app.get("/slogans", slogan.findAll);
  app.get("/slogans/random", slogan.genSlogan)
  app.post("/slogan/add", slogan.create);
  app.post("/slogan/update", verify.authenticateJWT, slogan.update);
  app.delete("/slogan/delete", verify.authenticateJWT, slogan.delete);

};