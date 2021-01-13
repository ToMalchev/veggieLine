module.exports = app => {

  const login = require("../controllers/login.controller.js");

  // Login
  app.post("/login", login.loginUser);

};