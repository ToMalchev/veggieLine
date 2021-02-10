module.exports = app => {

  const slogan = require("../controllers/slogan.controller.js");

  // Slogan
  app.get("/slogans", slogan.genSlogan);
  app.post("/slogans/add", slogan.createSlogan)

};