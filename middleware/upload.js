const util = require("util");
const multer = require('multer');
const path = require('path');

const dest_path = "/home/veggie/Projects/VeggieLine_FE/images/";
var image_name;

const storage = multer.diskStorage({
   destination: dest_path,
   filename: function(req, file, cb){
   	  console.log(req);
   	  image_name = "IMAGE-" + req.blogID + path.extname(file.originalname);
      cb(null,image_name);
   }
});

let upload = multer({
   storage: storage,
   limits:{fileSize: 5000000, filedSize: 2 * 1024 * 1024},
}).single("image");


// let uploadFileMiddleware = util.promisify(upload);
module.exports = upload; // uploadFileMiddleware;
