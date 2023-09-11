const router = require("express").Router();
const bcryptjs = require("bcryptjs");

const User = require("../model/user.model");
const mongoose = require("mongoose");
const { isLoggedOut, isLoggedIn } = require("../middleware/loggedInOut");
const {
  bothFilled,
  authenticateUser,
} = require("../middleware/isAuthenticated");

router.get("/login", isLoggedOut, (req, res, next) => {
  res.render("auth/login");
});

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
    res
      .redirect("/") //correct to /profile
      .catch((error) => next(error));
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
