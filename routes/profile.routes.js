const router = require("express").Router();
const app = require("../routes/profile.routes");
const User = require("../model/user.model");
const Post = require("../model/post.model");
const emojies = require("../assets/emojies.json");
const { isLoggedIn } = require("../middleware/loggedInOut");
const axios = require("axios");

//render profile page and emojies
router.get("/userProfile", isLoggedIn, (req, res) => {
  const userId = req.session.currentUser._id;

  Post.find({ author: userId }).then((userPosts) => {
    console.log(userPosts); 
    // ********* NEWLY ADDDED! FOR YOGA POSES ****************
    axios
      .get(process.env.YOGA_API_URL)
      .then((poses) => {
        const randomIndex = Math.floor(Math.random() * poses.data.length);
        const randomPose = poses.data[randomIndex];
        console.log(randomPose);

        // ******************************************************
        res.render("users/user-profile", {
          emojies,
          userInSession: req.session.currentUser,
          userPosts,

          // ********* NEWLY ADDDED! FOR YOGA POSES ****************

          poses: randomPose,

          // ******************************************************
        });
      })
      .catch((error) => {
        
      console.error("Error fetching yoga poses:", error);
      res.status(500).render('error-page', {
      errorMessage: '🥲 Sorry, our server is in maintenance phase! Please try again later.',
      });
    
  });
});
})

// ********* require fileUploader *********
const fileUploader = require("../config/cloudinary.config");

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
    // const avatar = req.file.path;
    const { username, fullName } = req.body;

    // Check if a new image was uploaded
    let avatar = req.body.avatar;
    // If a new image was uploaded, use its path
    if (req.file) {
      avatar = req.file.path;
    }

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


router.get("/posts/:postId/edit", (req, res, next) => {
  const { postId } = req.params;

  Post.findById(postId)
    .then((postToEdit) => {
      // console.log(postToEdit);
      res.render("posts/post-edit", { post: postToEdit });
    })
    .catch((error) => next(error));
});

//returning updated posts
router.post("/posts/:postId/edit", (req, res, next) => {
  const { postId } = req.params;
  const { title, content } = req.body;

  Post.findByIdAndUpdate(postId, { title, content }, { new: true })
    .then((updatedPost) => {
      console.log(updatedPost);
      res.redirect(`/posts/${updatedPost._id}`);
    })
    .catch((error) => next(error));
});


module.exports = router;
