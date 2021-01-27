const Blog = require("../models/blog.model.js");
const path = require('path')
const multer  = require('multer');

const imageDir = '/home/veggie/Projects/VeggieLine_FE/images/';
let imageName;

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, './test');
  },

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

  upload(req, res, (err) => {
    if (req.fileValidationError) {
      return res.status(500).send(req.fileValidationError);
    }
    else if (!req.file) {
      return res.status(404).send('Please select an image to upload');
    }
    else if (err instanceof multer.MulterError) {
      return res.status(500).send(err);
    }
    else if (err) {
      return res.status(500).send(err);
    }
  });
  try {
    if (Blog.updateImageById(blogId, imageName) == 0) {
      return res.status(404).send(`Not found blog with id: ${blogId}`)
    }
    return res.send('Image uploaded!');
  } catch(err) {
    return res.status(500).send('Failed to update image name!');
  }
};
