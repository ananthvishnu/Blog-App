const express = require("express");
const { createBlog, editBlog, deleteBlog, getAllBlogs, getBlogById } = require("../controllers/blogController");

const router = express.Router();

router.post("/create", createBlog);
router.get("/blogs",getAllBlogs);
router.get("/blogs/:id",getBlogById);
router.put("/edit/:id", editBlog);
router.delete("/delete/:id", deleteBlog);


module.exports = router;
