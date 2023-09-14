const router = require("express").Router();
const bcryptjs = require("bcryptjs");

const User = require("../model/user.model");
const mongoose = require("mongoose");
const { isLoggedOut, isLoggedIn } = require("../middleware/loggedInOut");
const {
  bothFilled,
  authenticateUser,
} = require("../middleware/isauthenticated");
const ensureNotLoggedIn = require("../middleware/ensuredNotLoggedIn");

router.get("/login", ensureNotLoggedIn, (req, res, next) => {
  res.render("auth/login");
});

router.post("/login", isLoggedOut, authenticateUser, (req, res, next) => {
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
});

// //if not a loggedin user, it can't log-out
// router.get("/logout", (req, res, next) => {
//   router.post("/login", authenticateUser);
// });

//if not a loggedin user, it can't log-out
router.post("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) next(err);
    res.redirect("/");
  });
});


module.exports = router;
