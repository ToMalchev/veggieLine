const Slogan = require("../models/slogan.model.js");

// Retrieve all Slogans from the database.
exports.genSlogan = (req, res) => {
  Slogan.getSloganList((err, data) => {
   // const random_num = Math.floor(Math.random()*data.length);
   // if (random_num > 5) {
   // 	data = data.slice(random_num-3, random_num)
   // }
   // else {
   // 	data = data.slice(random_num, random_num+3)
   // };
   //  if (err)
   //    res.status(500).send({
   //      message:
   //        err.message || "Some error occurred while retrieving slogans."
   //    });

    let shuffled = data
      .map((a) => ({sort: Math.random(), value: a}))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value)

    res.send(shuffled);
  });
};


exports.findAll = (req, res) => {
  Slogan.getSloganList((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving slogans."
      });
    else res.send(data);
  });
};


exports.create = (req, res) => {
  console.log(req.body.slogan);
  Slogan.create(req.body.slogan, (err, data) =>{
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Slogan."
      });
      return
    }
    res.status(200).send({message: "Successfuly created Slogan"})
  });
};

exports.update = (req, res) => {
   if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  let slogan_id = req.body.slogan.slogan_id
  let name = req.body.slogan.name
  Slogan.update(
    slogan_id,
    name,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Slogan with id ${slogan_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Slogan with id " + slogan_id
          });
        }
      } else {
        exports.findAll(req, res);
        // res.send(data);
      }
    }
  );
}

exports.delete = (req, res) => {
  Slogan.remove(req.body.slogan_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Slogan with id ${req.body.slogan_id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Slogan with id " + req.body.slogan_id
        });
      }
    } else {
      exports.findAll(req, res);
      // res.send({ message: `Slogan was deleted successfully!` });
    }
  });
};
