const router = require("express").Router();

//render page
router.get("/about", (req, res) => {
  res.render("about")
});

module.exports = router;