const { Router } = require("express");
const router = new Router();
const mongoose = require("mongoose");
const User = require("../model/user.model");
const ensureNotLoggedIn = require("../middleware/ensuredNotLoggedIn")

router.get("/signup",ensureNotLoggedIn, (req, res) => res.render("auth/signup"));

router.post("/signup", (req, res, next) => {
  const { username, password } = req.body;


  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

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
          errorMessage: "User not found and/or incorrect password.",
        });
      } else {
        next(error);
      }
    });
});

module.exports = router;
