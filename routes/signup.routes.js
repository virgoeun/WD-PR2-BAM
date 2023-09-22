const { Router } = require("express");
const router = new Router();
const mongoose = require("mongoose");
const User = require("../model/user.model");
const ensureNotLoggedIn = require("../middleware/ensuredNotLoggedIn");
const { bothFilled } = require("../middleware/isauthenticated");

router.get("/signup", ensureNotLoggedIn, bothFilled, (req, res, next) => {
  res.render("auth/signup");
});
// User is already logged in, redirect to their profile page

router.post("/signup", (req, res, next) => {
  const { username, password } = req.body;

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

  //Strong PW: Regular Expression
  if (!regex.test(password)) {
    res.status(500).render("auth/signup", {
      errorMessage:
        "Password must be at least six characters long with one uppercase letter, one lowercase letter and a number",
    });
  }

  User.create({
    username,
    password,
  })
    .then((userfromDB) => {
      console.log(userfromDB);
      res.redirect("/userProfile");
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render("auth/signup", { errorMessage: error.message });
      } else if (error.code === 11000) {
        console.log(
          "Username and password need to be unique. Either username or email is already used."
        );

        res.status(500).render("auth/signup", {
          errorMessage: "Username is already taken! 🥲",
        });
      } else {
        next(error);
        console.log(error);
      }
      // adsjdsaj
    });
});

module.exports = router;
