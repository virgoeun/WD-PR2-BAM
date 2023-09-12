const router = require("express").Router();

const User = require("../models/User.model");
const Post = require("../models/Post.model");
const Comment = require("../models/Comment.model");

//Post route here
router.post('/posts/:postId/comment', (req, res, next) => {
    const { postId } = req.params;
    const { author, content } = req.body;
   
    let user;
   
    User.findOne({ username: author })
      .then(userDocFromDB => {
        user = userDocFromDB;
   
        // if commenter is not user yet, let's register him/her as a user
        if (!userDocFromDB) {
          return User.create({ username: author });
        }
      })
      .then(newUser => {
        // prettier-ignore
        Post.findById(postId)
        .then(dbPost => {
          let newComment;
   
          // the conditional is result of having the possibility that we have already existing or new users
          if (newUser) {
            newComment = new Comment({ author: newUser._id, content });
          } else {
            newComment = new Comment({ author: user._id, content });
          }
   
          // when new comment is created, we save it ...
          newComment
          .save()
          .then(dbComment => {
   
            // ... and push its ID in the array of comments that belong to this specific post
            dbPost.comments.push(dbComment._id);
   
            // after adding the ID in the array of comments, we have to save changes in the post
            dbPost
              .save()       // if everything is ok, we redirect to the same page to see the comment
              .then(updatedPost => res.redirect(`/posts/${updatedPost._id}`))
          });
        });
      })
      .catch(err => {
        console.log(`Error while creating the comment: ${err}`);
        next(err);
      });
  });
   
 module.exports = router;