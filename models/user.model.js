const sql = require("./db.js");

// constructor
const User = function(User) {
  this.user_id = User.user_id;
  this.user_name = User.user_name;
  this.password = User.password;
  this.email = User.email;
  this.is_active = User.is_active;
  this.role_id = User.role_id;
};

User.testFunc = () => {
  console.log('212121212')
};

  
User.findUser = (UserName, UserPassword, result) => {

  sql.query(`SELECT * FROM User WHERE user_name = ? AND password = ?`, [UserName, UserPassword], (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    // not found Blog with the id
    result({ kind: "Wrong user name or password! Please try again" }, null);
  });
};

module.exports = User;