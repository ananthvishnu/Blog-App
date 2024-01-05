const Blog = require("../models/Blog");

// Create blog
const createBlog = async (req, res) => {
  try {
    const { title, content, userId, author } = req.body;

    // Assuming you have a userId associated with the blog
    const blog = await Blog.create({
      title: title,
      content: content,
      author:author,
      userId: userId,
    });

    res.status(201).json({
      message: "Blog created successfully",
      blog: blog,
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    res
      .status(500)
      .json({ message: "Blog creation error occurred", status: 500 });
  }
};

// Edit blog
const editBlog = async (req, res) => {
  try {
    const { id } = req.params;


    const { title, content, author } = req.body;
    const blog = await Blog.findByPk(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found", status: 404 });
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.author = author || blog.author

    await blog.save();

    res.status(200).json({
      message: "Blog edited successfully",
      blog: blog,
    });
  } catch (error) {
    console.error("Error editing blog:", error);
    res.status(500).json({ message: "Blog edit error occurred", status: 500 });
  }
};

// Delete blog
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findByPk(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found", status: 404 });
    }

    await blog.destroy();

    res.status(200).json({
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Blog deletion error occurred", status: 500 });
  }
};

// Get all blogs
const getAllBlogs = async (req, res) => {
  try {
    // Retrieve all blogs from the database
    const blogs = await Blog.findAll();

    res.status(200).json({
      message: "Blogs retrieved successfully",
      blogs: blogs,
    });
  } catch (error) {
    console.error("Error getting all blogs:", error);
    res.status(500).json({ message: "Error occurred while getting blogs" });
  }
};

// Get blog by ID
const getBlogById = async (req, res) => {
  try {
    // Extract blog ID from the request parameters
    const id = req.params.id;

    // Find the blog by ID
    const blog = await Blog.findByPk(id);

    if (blog) {
      res.status(200).json({
        message: "Blog retrieved successfully",
        blog: blog,
      });
    } else {
      res.status(404).json({ message: "Blog not found" });
    }
  } catch (error) {
    console.error("Error getting blog by ID:", error);
    res.status(500).json({ message: "Error occurred while getting blog by ID" });
  }
};

module.exports = {
  createBlog,
  editBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById
};
