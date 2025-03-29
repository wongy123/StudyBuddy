const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const studySessionRoutes = require("./studySessionRoutes");
const commentRoutes = require("./commentRoutes");


app.use("/sessions/:sessionId/comments", commentRoutes);
app.use("/users", userRoutes);
app.use("/sessions", studySessionRoutes);


module.exports = router;