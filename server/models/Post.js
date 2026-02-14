const mongoose = require ("mongoose");

const postSchema = new mongoose.Schema({
  title: String,
  excerpt: String,
  content: String,
  author: { type: String, default: "Antony Mwandiki" },
  image: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Post", postSchema);

