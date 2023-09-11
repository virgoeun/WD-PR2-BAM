const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
// require('dotenv/config');

// ℹ️ Connects to the database
// require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express


// Handles the handlebars
// https://www.npmjs.com/package/hbs


const express = require('express');

const hbs = require('hbs');
const path = require('path');

const app = express();


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, resp) => {
    resp.render("index");
  });

// app.listen(3000, () => console.log('🏃‍ on port 3000'));

// require('./config/session.config')(app);
// require('./config')(app);

// const projectName = 'lab-express-basic-auth';
// const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();

// app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;

// const index = require('./routes/index');
// app.use('/', index);

const loginRoutes = require("./routes/login.routes");
app.use("/", loginRoutes);

// require('./error-handling')(app);

module.exports = app;