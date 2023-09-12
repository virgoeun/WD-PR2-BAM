require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

require('dotenv/config');

// ℹ️ Connects to the database
require('./db');

const express = require('express');

const hbs = require('hbs');

const app = express();
require("./config/session.config")(app);
require("./config")(app);

// app.set('view engine', 'hbs');
// app.set('views', path.join(__dirname, 'views'));
// app.use(express.static(path.join(__dirname, 'public')));

const projectName = 'Hugger';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();
app.locals.title = `${capitalized(projectName)} by BAM!`;

const index = require("./routes/index");
app.use("/", index);

const signUpRoutes = require("./routes/signup.routes");
app.use("/", signUpRoutes);

const loginRoutes = require("./routes/login.routes");
app.use("/", loginRoutes);

const profileRoute = require("./routes/profile.routes");
app.use("/", profileRoute);

//Always comes the Last!
require('./error-handling')(app);


module.exports = app;
