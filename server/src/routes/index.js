const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const studySessionRoutes = require("./studySessionRoutes");
const commentRoutes = require("./commentRoutes");
const authRoutes = require("./authRoutes");


router.use("/sessions/:sessionId/comments", commentRoutes);
router.use("/users", userRoutes);
router.use("/sessions", studySessionRoutes);
router.use("/auth", authRoutes);


module.exports = router;