const User = require("../model/user.model"); // Import your user model here
const bcryptjs = require("bcryptjs");
// const saltRounds = 10;

function bothFilled(req, res, next) {
  const { username, password } = req.body;

  // Check if both fields are filled
  if (!username || !password) {
    return res.render("auth/login", {
      errorMessage: "🐣 Please enter both username and password to login.",
    });
  }

  next();
}

function authenticateUser(req, res, next) {
  const { username, password } = req.body;

  User.findOne({ username })
    .then((user) => {
      if (!user) {
        console.log("Username not registered.");
        res.render("auth/login", {
          errorMessage: "🦨 🦨 🦨 User not found and/or incorrect password.",
        });
      } else if (bcryptjs.compareSync(password, user.password)) {
        req.session.currentUser = user;
        res.redirect("/userProfile"); //change to /profile
      } else {
        console.log("Incorrect password. ");
        res.render("auth/login", {
          errorMessage: "🥲 User not found and/or incorrect password.",
        });
      }
    })
    .catch((error) => {
      console.error("Error while authenticating user:", error);
      res.status(500).send("Internal Server Error");
    });
}

module.exports = { bothFilled, authenticateUser };
