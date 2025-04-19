const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const studySessionRoutes = require("./studySessionRoutes");
const authRoutes = require("./authRoutes");
const qutEventRoutes = require("./qutEventRoutes");


// router.use("/sessions/:sessionId/comments", commentRoutes);
router.use("/users", userRoutes);
router.use("/sessions", studySessionRoutes);
router.use("/auth", authRoutes);
router.use("/qut-events", qutEventRoutes);


module.exports = router;