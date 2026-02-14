require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const contactRoutes = require("./routes/contactRoutes");
const chatRoutes = require("./routes/chatRoutes");
const postsRoute = require("./routes/posts.js");
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

app.use("/api/contact", contactRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/posts", postsRoute);

const PORT = 5000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
