const Blog = require("../models/blog.model.js");
const BlogCategory = require("../models/blogCategory.model.js")

const getCategoriesBlog = (data) => {
  data = data.map(obj =>{
  var blog = obj;
  var category_list = []
  let categories = obj.categories.split(';')
  categories.forEach(category => {
    var category_obj = {}
    let cat_fields = category.split(',')
    cat_fields.forEach(field => {
      let vars = field.split(':')
      category_obj[vars[0]] = vars[1]
    })
    category_list.push(category_obj)
  })
  blog.categories = category_list
  return blog;
  });
  return data;
};

// Create and Save a new Blog
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.body.blog);
  let incomeBlog = req.body.blog;
  // Create a Blog
  const blog = new Blog({
    title: incomeBlog.title,
    content: incomeBlog.content,
    image: incomeBlog.image,
    description: incomeBlog.description,
    user_id: req.user.id,
    blog_id: null,
    categories: null
  });

  // Save Blog in the database
  Blog.create(blog, (err, blogId) => {

    if(err) {
      res.status(500).send("Some error occurred while saving blog.")
    } else {
      let categoryList = [];
      incomeBlog.categories.forEach(category => {categoryList.push([blogId, category.category_id]);});
      BlogCategory.create(categoryList, (err_1, data) => {
        if (err_1) {
          res.status(500).send("Some error occurred while saving blog category.")
        }
        else res.send("Blog successfully added!");
      });    }
  });
};

// Retrieve all Blogs from the database.
exports.findAll = (req, res) => {
  Blog.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Blogs."
      });
    else {
      data = getCategoriesBlog(data);
      res.send(data);}
  });
};

// Retrieve all Blogs from the database.
exports.findLimited = (req, res) => {
  Blog.getLimited( 2,(err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Blogs."
      });
    else {
      data = getCategoriesBlog(data);
      res.send(data);
    }
  });
};

// Find a single Blog with a BlogId
exports.findOne = (req, res) => {
  Blog.findById(req.query.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Blog with id ${req.query.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Blog with id " + req.query.id
        });
      }
    } else {
      data = getCategoriesBlog(data);
      res.status(200).send(data[0]);
    }
  });
};

// Update a Blog identified by the BlogId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Blog.updateById(
    req.params.blog_id,
    new Blog(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Blog with id ${req.params.blog_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Blog with id " + req.params.blog_id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Blog with the specified blog_id in the request
exports.delete = (req, res) => {
  Blog.remove(req.params.blog_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Blog with id ${req.params.blog_id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Blog with id " + req.params.blog_id
        });
      }
    } else res.send({ message: `Blog was deleted successfully!` });
  });
};

// Delete all Blogs from the database.
exports.deleteAll = (req, res) => {
  Blog.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Blogs."
      });
    else res.send({ message: `All Blogs were deleted successfully!` });
  });
};

exports.search = (req, res) => {
  var categories = req.query.categories
  if (categories) {
    categories = categories.replace(" ", "").split(","); 
  }

  Blog.search(req.query.name, categories, (err, data)=>{
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Blogs."
      });
    else {
      // console.log(data)
      data = getCategoriesBlog(data);
      let pages_num = Math.ceil(data?data.length/4:1)
      let data_final = {blogs: data, blog_count: data.length, pages_num: pages_num}
      res.send(data_final);

    };
  });

};