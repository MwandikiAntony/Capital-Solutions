import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  excerpt: String,
  content: String,
  author: { type: String, default: "Antony Mwandiki" },
  image: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Post", postSchema);
