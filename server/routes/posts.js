const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

/* GET all posts */
router.get("/", async (req, res) => {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
});

/* GET single post by slug */
router.get("/:slug", async (req, res) => {
    const post = await Post.findOne({ slug: req.params.slug });
    res.json(post);
});

/* CREATE post (for admin use) */
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    await newPost.save();
    res.json(newPost);
});

module.exports = router;
