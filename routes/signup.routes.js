const { Router } = require("express");
const router = new Router();
// const bcryptjs = require("bcryptjs");
// const saltRounds = 10;
const mongoose = require("mongoose");
const User = require("../model/user.model");
const { bothFilled } = require("../middleware/isAuthenticated");

router.get("/signup", (req, res) => res.render("auth/signup"));

router.post("/signup", bothFilled, (req, res, next) => {
  const { username, password } = req.body;

  //    if (!username || !password) {
  //     res.render('auth/signup', {
  //         errorMessage:"All fields are mandatory. Please provide your username and password."
  //     })
  //     return;
  //    }

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

  if (!regex.test(password)) {
    res.status(500).render("auth/signup", {
      errorMessage:
        "Password must be at least six characters long with one uppercase letter, one lowercase letter and a number",
    });
  }

  //    bcryptjs
  //    .genSalt(saltRounds)
  //    .then(salt => bcryptjs.hash(password, salt))
  //    .then(hashedPassword => {
  //     return User.create({
  //         username,
  //         passwordHash: hashedPassword
  //     });
  //    })

  User.create({
    username,
    password, // The password will be hashed automatically by the pre-save middleware
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
          "Username and password need to be unique. This Username is already used."
        );

        res.status(500).render("auth/signup", {
          errorMessage: "🤪Username already exists. Please choose a different username.",
        });
      } else {
        next(error);
      }
    });
});

module.exports = router;
