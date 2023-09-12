const router = require("express").Router();
const User = require("../model/user.model");
const app = require("../routes/profile.routes");
const emojies = require("../assets/emojies.json");
// const recommendations = require("../assets/daily-recommendations.json");


//render profile page and emojies
router.get("/userProfile", (req, res) => {
  res.render("users/user-profile", {
    emojies,
    userInSession: req.session.currentUser,
  });
});

//handle mood submission
router.post("/submit-mood", (req, res) => {
  const selectedMood = req.body.selectedMood;
  console.log(selectedMood)

  // Redirect to the user profile page
  res.redirect("/userProfile");
});

//get edit form
router.get("/userProfile/edit/:id", (req, res) => {
  // Fetch user data based on the current user's session
  const userId = req.params.id;
  User.findById(userId)
    .then((user) => res.render("users/edit-user-profile", { user }))
    .catch((error) => console.log(error));
});

//handle edit form submission
router.post("/userProfile/edit/:id", (req, res) => {
  // Update the user's profile information in the database based on the form data
  const userId = req.params.id;
  const { avatar, username, fullName } = req.body;
  User.findByIdAndUpdate(
    userId,
    { avatar, username, fullName },
    { new: true }
  ).then((updateUser) => res.redirect("/userProfile"))
  .catch((error)=> console.log(error))
});

//render the mood on the journal page
router.get("/daily-journal", (req, res) => {
  //get mood data
  res.render("daily-journal");
});

// get route for journal page
router.get("/daily-journal", (req, res) => {
  res.render("users/daily-journal");
});

//get route for community
router.get("/comunity", (req, res) => {
  res.render("users/comunity");
});

module.exports = router;
