const router = require("express").Router();
const app = require("../routes/profile.routes");
const User = require("../model/user.model");
const emojies = require("../assets/emojies.json");
const { isLoggedOut, isLoggedIn } = require("../middleware/loggedInOut");
const axios = require("axios");


//render profile page and emojies
router.get("/userProfile", isLoggedIn, (req, res) => {
  
// ********* NEWLY ADDDED! FOR YOGA POSES ****************

  axios.get(process.env.YOGA_API_URL).then((poses) => {
    const randomIndex = Math.floor (Math.random()*poses.data.length)
    const randomPose = poses.data[randomIndex]
    console.log(randomPose)

// ******************************************************
    res.render("users/user-profile", {
      emojies,
      userInSession: req.session.currentUser,

// ********* NEWLY ADDDED! FOR YOGA POSES ****************
      
      poses: randomPose
  
// ******************************************************
    });
  })
  .catch ((error) => console.log("HERE IS THE ERROR!!!",error))
})

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
