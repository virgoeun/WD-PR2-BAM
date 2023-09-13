const { Router } = require("express");
const router = new Router();

const Post = require("../model/post.model");
const User = require("../model/user.model");

//get route
router.get("/community", (req, res) => {
  console.log(req.session.currentUser);
  res.render("posts/create", { xyz: req.session.currentUser });
});

//post route
router.post("/create-post", (req, res) => {
  console.log(req.session.currentUser._id);
  const { title, content } = req.body;

  Post.create({ title, content, author: req.session.currentUser._id })
    .then((dbPost) => {
      return User.findByIdAndUpdate(req.session.currentUser._id, {
        $push: { posts: dbPost._id },
      });
    })
    .then(() => res.redirect("/posts"))
    .catch((error) => console.log(error));
});

//list all posts
router.get("/posts", (req, res, next) => {
  Post.find()
    .populate("author")
    .then((dbPosts) => {
      console.log("Posts from the DB: ", dbPosts);
      res.render("posts/list", { posts: dbPosts });
    })
    .catch((err) => {
      console.log(`Err while getting the posts from the DB: ${err}`);
      next(err);
    });
});

//display a single post
router.get("/posts/:postId", (req, res, next) => {
  const { postId } = req.params;

  Post.findById(postId)
    .populate("author")
    .populate({
      path: "comments",
      populate: {
        path: "author",
        model: "User",
      },
    })
    .then((foundPost) => res.render("posts/details", foundPost))
    .catch((err) => {
      console.log(`Err while getting a single post from the  DB: ${err}`);
      next(err);
    });
});

module.exports = router;
