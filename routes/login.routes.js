const router = require("express").Router();
const bcryptjs = require("bcryptjs");

const User = require("../model/user.model");
const mongoose = require("mongoose");
const { isLoggedOut, isLoggedIn } = require("../middleware/loggedInOut");
const {
  bothFilled,
  authenticateUser,
} = require("../middleware/isAuthenticated");

router.get("/login", (req, res, next) => {
  res.render("auth/login");
});

// isLoggedOut
// bothFilled,
// authenticateUser,
//isLoggedout : if already logged-in user tries to access
// to login page, then middleware blocks it

router.post(
  "/login",
  isLoggedOut,
  bothFilled,
  authenticateUser,
  (req, res, next) => {
    const { username, password } = req.body;
    console.log(req.body);
    const user = username;
    req.session.user = username; // Store user data in the session
    req.session
      .save((err) => {
        if (err) {
          console.error(err);
          return next(err);
        }
        res.redirect("/userProfile");
      })
      .catch((error) => console.log(error));
    // next(error));
  }
);

//if not a loggedin user, it can't log-out
router.post("/logout", isLoggedIn, (req, res, next) => {
  req.session.destroy((err) => {
    if (err) next(err);
    res.redirect("/");
  });
});

module.exports = router;
