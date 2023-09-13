const router = require("express").Router();
const app = require("../routes/profile.routes");
const User = require("../model/user.model");
const emojies = require("../assets/emojies.json");
const { isLoggedOut, isLoggedIn } = require("../middleware/loggedInOut");
// const recommendations = require("../assets/daily-recommendations.json");

//render profile page and emojies
router.get("/userProfile", isLoggedIn, (req, res) => {
  res.render("users/user-profile", {
    emojies,
    userInSession: req.session.currentUser,
  });
});

//handle mood submission
router.post("/submit-mood", isLoggedIn, (req, res) => {
  const selectedMood = req.body.selectedMood;

  // Redirect to the user profile page
  res.redirect("/userProfile");
});


//get edit form  :id
router.get("/userProfile/edit/", isLoggedIn, (req, res) => {
  // Fetch user data based on the current user's session
  const username = req.session.currentUser.username;

  User.findOne({ username })
    .then((user) => {
      res.render("users/edit-user-profile", { user });
    })
    .catch((error) => console.log(error));
});

//handle edit form submission
router.post("/userProfile/edit/", isLoggedIn, (req, res) => {
  // Update the user's profile information in the database based on the form data

  const username = req.session.currentUser.username;

  const { avatar, username: newUsername, fullName } = req.body;
  User.findOneAndUpdate(
    userName,
    { avatar, username: newUsername, fullName },
    { new: true }
  )
    .then((updateUser) => res.redirect("/userProfile"))
    .catch((error) => console.log(error));
});


// get posts from community page
router.get("/userProfile", isLoggedIn, (req, res) => {
  const userId = req.session.currentUser._id;

  // Assuming you have a "Post" model with a field named "author" to store the user who created the post
  Post.find({ author: userId })
    .then((userPosts) => {
      res.render("userProfile", { user: req.session.currentUser, userPosts });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
