const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const express = require("express")

// ℹ️ Gets access to environment variables/settings
const app = express();
require('./config/session.config')(app);
require('./config')(app);

// app.set('view engine', 'hbs');
// app.set('views', path.join(__dirname, 'views'));
// app.use(express.static(path.join(__dirname, 'public')));

const projectName = 'Hugger';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();

const index = require('./routes/index');
app.use('/', index);

const signUpRoutes = require("./routes/signup.routes");
app.use("/", signUpRoutes);

//Always comes the Last!
require('./error-handling')(app);

module.exports = app;
