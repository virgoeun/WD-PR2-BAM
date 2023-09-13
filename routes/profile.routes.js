const router = require("express").Router();
// added to handle image upload

const app = require("../routes/profile.routes");
const User = require("../model/user.model");
const emojies = require("../assets/emojies.json");
const { isLoggedOut, isLoggedIn } = require("../middleware/loggedInOut");

// ********* require fileUploader in order to use it *********
const fileUploader = require("../config/cloudinary.config");

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
  res.redirect("/userProfile");
});

//get edit form
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
router.post(
  "/userProfile/edit/:id",
  isLoggedIn,
  fileUploader.single("avatar"),
  (req, res) => {
    const { id } = req.params;
    const avatar = req.file.path;
    const { username, fullName } = req.body;
    User.findByIdAndUpdate(id, { username, fullName, avatar }, { new: true })
      .then((updateUser) => {
        req.session.currentUser = updateUser;
        res.redirect("/userProfile");
      })
      .catch((error) => console.log(error));
  }
);

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
