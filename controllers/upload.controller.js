const Blog = require("../models/blog.model.js");
const uploadFile = require("../middleware/upload.js")

exports.uploadImage = async (req, res) => {
console.log('hhajkdhbjkadhjandj')
  try {

    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    const blog_id = req.blog_id
    const image_path = uploadFile.image_name + uploadFile.dest_path
    const blog = Blog.updateImageById(blog_id, image_path, res)
    
    res.status(200).send({
      message: "Uploaded the file successfully: " + uploadFile.image_name
    });
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${uploadFile.image_name}. ${err}`,
    });
  }
};


// exports.uploadImage = (req, res) => {
//   Blog.((err, data) => {
//      console.log("Request ---", req.body);
//       console.log("Request file ---", req.file);//Here you get file.
//       /*Now do where ever you want to do*/
//       if(!err)
//          return res.send(200).end();
//   });
// };
