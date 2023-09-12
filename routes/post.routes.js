const { Router } = require("express");
const router = new Router();

const Post = require("../model/post.model");
const User = require("../model/user.model");

//get route
router.get("/community", (req, res) => {
  console.log(req.session.currentUser);
  res.render("posts/create");
});

// router.get("/create-post", (req, res) => {
//   console.log(req.session.currentUser);
//   res.render("posts/create");
// });

//post route
router.post("/create-post", (req, res) => {
  console.log(req.session);
  const { title, content, author } = req.body;

  Post.create({ title, content, author })
    .then((dbPost) => {
      return User.findByIdAndUpdate(author, { $push: { content: dbPost._id } });
    })
    .then(() => res.redirect("/posts"))
    .catch((error) => console.log(error));
});

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

router.get("/posts/:postId", (req, res, next) => {
  const { postId } = req.params;

  Post.findById(postId)
    // .populate("author comments")
    // .populate({
    //   path: "comments",
    //   populate: {
    //     path: "author",
    //     model: "User",
    //   },
    // })
    .then((foundPost) => res.send(foundPost))
    .catch((err) => {
      console.log(`Err while getting a single post from the  DB: ${err}`);
      next(err);
    });
});

module.exports = router;
