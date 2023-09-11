const router = require("express").Router();
const emojies = require("../assets/emojies.json");
const recommendations = require("../assets/daily-recommendations.json");

// get route for user profile
// how to render the mood options { moodOptions }
router.get("/userProfile", (req, res) => {
  res.render("users/user-profile", { emojies });
});

// get route for journal page
router.get("/daily-journal", (req, res) => {
  res.render("users/daily-journal", { userInSession: req.session.currentUser });
});

//handle mood submission
router.post("/submit-mood", (req, res) => {
  const selectedMood = req.body.mood;

  // Store mood data in the array
  moodData.push(selectedMood);

  // Redirect to the user profile page
  res.redirect("users/user-profile");
});

//render the mood on the journal page
router.get("/daily-journal", (req, res) => {
  res.render("daily-journal");
});

module.exports = router;