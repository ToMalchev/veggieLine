module.exports = app => {

  const slogan = require("../controllers/slogan.controller.js");

  // Slogan
  app.get("/slogan", slogan.genSlogan);

};