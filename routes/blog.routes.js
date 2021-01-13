module.exports = app => {
  const blog = require("../controllers/blog.controller.js");
  
  // Create a new Blog
  app.post("/blog/add", blog.create);

  // Retrieve all Blogs
  app.get("/blogs", blog.findAll);

  // Retrieve last two Blogs
  app.get("/blogs/latest", blog.findLimited);

  // Retrieve a single Blog with customerId
  app.get("/blog", blog.findOne);

  // Update a Blog with customerId
  app.put("/update/blog/:id", blog.update);

  // Delete a Blog with customerId
  app.delete("/blogs/delete/:id", blog.delete);

  // Delete all Blogs
  app.delete("/blogs/delete", blog.deleteAll);
};