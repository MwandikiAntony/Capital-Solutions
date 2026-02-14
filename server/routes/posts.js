const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// Create Post
router.post("/", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    await newPost.save();
    res.status(201).json({ message: "Post created successfully" });
  } catch (err) {
    console.error("Post creation error:", err);
    res.status(500).json({ error: "Failed to create post" });
  }
});


// Get All Posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// Get Single Post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
  } catch {
    res.status(404).json({ error: "Post not found" });
  }
});

module.exports = router;
