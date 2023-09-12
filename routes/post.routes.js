const { Router } = require('express');
const router = new Router();
const mongoose = require('mongoose');
const Post = require('../model/post.model')
const User = require('../model/user.model')

//get route

//post route
router.post('/create', (req, res) => {
    const {author, content, comments } = req.body;

    Post
    .create({ author, content, comments })
    .then(dbPost => {
        return User.findByIdAndUpdate(author, {$push: {content: dbPost._id}})
    })
    .then(() => res.redirect('/posts'))//not sure
    .catch(error => console.log(error))
  });

router.get('/create-post', (req, res) => {
    Post
    .find()
      .then(dbPosts => {
        console.log('Posts from the DB: ', dbPosts);
      })
      .catch(err => {
        console.log(`Err while getting the posts from the DB: ${err}`);
        next(err);
      });
  });

  module.exports = router