const router = require("express").Router();
const Post = require("../model/post.model");
const Comment = require("../model/comment.model");
const User = require("../model/user.model");
const { isLoggedIn } = require("../middleware/loggedInOut"); //if it is exported in curlies, should be imported in curlies. 

//Post route here
router.post("/posts/:postId/comment", isLoggedIn, (req, res, next) => {
  const { postId } = req.params;
  const { content } = req.body;
  console.log(req.session);
  // let user;

  User.findOne({ username: req.session.currentUser.username })
    .then((user) => {
      if (!user) {
        console.log("User not found");
        return res.status(404).send("User not found");
      }

      Post.findById(postId).then((dbPost) => {
        if (!dbPost) {
          console.log("Post not found");
          return res.status(404).send("Post not found");
        }

        const newComment = new Comment({
          author: req.session.currentUser._id,
          content,
        });
        newComment.save()
        .then((dbComment) => {
          // console.log("Comment created:", dbComment);
          dbPost.comments.push(dbComment._id);

          dbPost
            .save() // if everything is ok, we redirect to the same page to see the comment
            .then((updatedPost) => {
              console.log("Post updated:", updatedPost);
              res.redirect(`/posts/${updatedPost._id}`);
            });
        });
      });
    })
    .catch((err) => {
      console.log(`Error while creating the comment: ${err}`);
      next(err);
    });
});

module.exports = router;
