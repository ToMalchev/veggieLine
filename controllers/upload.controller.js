const Blog = require("../models/blog.model.js");
const path = require('path')
const multer  = require('multer');

const imageDir = '/home/veggie/Projects/VeggieLine_FE/images/';
var imageName;

const storage = multer.diskStorage({
  destination: imageDir,

  // By default, multer removes file extensions so let's add them back
  filename: function(req, file, cb) {
    imageName = imageName + path.extname(file.originalname);
    cb(null, imageName);
  }
});

let upload = multer({ storage: storage }).single('image');

exports.uploadImage = (req, res) => {
  let blogId = req.query.blogId;
  imageName = "IMAGE-" + blogId;
  console.log(req.body)

  upload(req, res, (err, nameF) => {
    console.log(nameF)
    if (req.fileValidationError) {
      return res.status(500).send({message: req.fileValidationError});
    }
    else if (!req.file) {
      return res.status(404).send({message: 'Please select an image to upload'});
    }
    else if (err instanceof multer.MulterError) {
      return res.status(500).send({message: err});
    }
    else if (err) {
      return res.status(500).send({message: err});
    }
  
    try {
      Blog.updateImageById(blogId, imageName, (err_1, data) => {
        if (err_1) {
          return res.status(404).send({message: `Not found blog with id: ${blogId}`})
        }
        return res.send('Image uploaded!'); 
      });
    } catch(err) {
      return res.status(500).send({message: 'Failed to update image name!'});
    }
  });
};
