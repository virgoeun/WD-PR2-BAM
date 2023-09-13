const express = require("express");

const logger = require("morgan");

const cookieParser = require("cookie-parser");

const favicon = require("serve-favicon");

const path = require("path");


module.exports = (app) => {

    app.use(logger("dev"));
  
    // To have access to `body` property in the request
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
  
    // Normalizes the path to the views folder
    app.set("views", path.join(__dirname, "..", "views"));
    // Sets the view engine to handlebars
    app.set("view engine", "hbs");
    // Handles access to the public folder
    app.use(express.static(path.join(__dirname, "..", "public")));

};