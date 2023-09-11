const router = require("express").Router();
const emojies = require("../assets/emojies.json");
const recommendations = require("../assets/daily-recommendations.json");

// get route for user profile
// how to render the mood options { moodOptions }
router.get("/userProfile", (req, res) => {
  res.render("users/user-profile", { emojies });
  console.log(emojies)
});

// get route for journal page
router.get("/daily-journal", (req, res) => {
  res.render("users/daily-journal", { userInSession: req.session.currentUser });
});

//handle mood submission
router.post("/submit-mood", (req, res) => {
  // const selectedMood = req.body.mood // maybe Usermodel needs 'mood'??
  // console.log(selectedMood) // undefined

  // Store mood data in the array
  // moodData.push(selectedMood); // no idea?

  // Redirect to the user profile page
  res.redirect("userProfile");
});

//render the mood on the journal page
router.get("/daily-journal", (req, res) => {
  res.render("daily-journal");
});

module.exports = router;
