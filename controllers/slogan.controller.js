const slogan = require("../models/slogan.model.js");

// Retrieve all Blogs from the database.
exports.genSlogan = (req, res) => {
  slogan.getSloganList((err, data) => {
  	const random_num = Math.floor(Math.random()*data.length);
  	if (random_num > 6) {
  		data_f = data.slice(random_num-3, random_num)
  	}
  	else {
  		data_f = data.slice(random_num, random_num+3)
  	};
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving slogans."
      });
    else res.send(data_f);
  });
};
