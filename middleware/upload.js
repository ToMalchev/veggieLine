const util = require("util");
const multer = require('multer');
const path = require('path');

const dest_path = "/home/veggie/Projects/VeggieLine_FE/images/";
var image_name;

let storage = multer.diskStorage({
   destination: "/home/todorm/Pictures/",
   filename: function(req, file, cb){
   	  image_name = "IMAGE-" + req.blogID + path.extname()
      cb(null,image_name);
   }
});

let upload = multer({
   storage: storage,
   limits:{fileSize: 1000000},
}).single("myImage");


let uploadFileMiddleware = util.promisify(upload);
module.exports = [uploadFileMiddleware, dest_path, image_name];