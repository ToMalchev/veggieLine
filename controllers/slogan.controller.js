const Slogan = require("../models/slogan.model.js");

// Retrieve all Blogs from the database.
exports.genSlogan = (req, res) => {
  slogan.getSloganList((err, data) => {
  	const random_num = Math.floor(Math.random()*data.length);
  	if (random_num > 5) {
  		data = data.slice(random_num-3, random_num)
  	}
  	else {
  		data = data.slice(random_num, random_num+3)
  	};
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving slogans."
      });
    else res.send(data);
  });
};

exports.createSlogan = (req, res) => {
  let slogan_req = req.body;
  console.log(req.data)
  console.log(slogan_req)
  Slogan.create(slogan_req, (err, data) =>{
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Blog."
      });
      return
    }
    res.status(200).send({message: "Successfuly created Slogan"})
  });

}