require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const express = require("express");


const hbs = require("hbs");
const app = express();
require("./config/session.config")(app);
require("./config")(app);

const projectName = "Hugger";
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();
app.locals.title = `${capitalized(projectName)} by BAM!`;

//handling all routes here
const index = require("./routes/index");
app.use("/", index);

const signUpRoutes = require("./routes/signup.routes");
app.use("/", signUpRoutes);

const loginRoutes = require("./routes/login.routes");
app.use("/", loginRoutes);

const profileRoutes = require("./routes/profile.routes");
app.use("/", profileRoutes);

const communityRouter = require("./routes/post.routes");
app.use("/", communityRouter);

const aboutRoutes = require("./routes/about.routes");
app.use("/", aboutRoutes);

const jounalRoutes = require("./routes/journal.routes.js");
app.use("/", jounalRoutes);

const commentRoutes = require("./routes/comment.routes");
app.use("/", commentRoutes);

//Always comes the Last!
require("./error-handling")(app);

module.exports = app;
