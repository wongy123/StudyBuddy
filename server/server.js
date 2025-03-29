const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors");
const indexRouter = require("./src/routes/index");

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", indexRouter);
app.use("/", (req, res) => {
    res.send("Welcome to StudyBuddy API!");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;