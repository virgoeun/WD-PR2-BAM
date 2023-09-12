const router = require("express").Router();
const User = require("../model/user.model");
const Journal = require("../model/journal.model");


//journal form get
router.get("/daily-journal", ensureAuthenticated, (req, res) => {
    res.render("journal/daily-journal", { userInSession: req.session.currentUser });
  });

//journal post 

  router.post("/daily-journal", (req, res, next) => {
    const {title, content, author, createdAt} = req.body;

    Journal.create({title, content, author, createdAt})
    .then((journalPost) => {
        console.log(journalPost)
        console.log(journalPost._id)
        return User.findByIdAndUpdate (author, {$push:{journals: journalPost._id}});
    })
    .then (() => res.redirect("/journal-list")) // need to get!
    .catch(err => next(err));
    })

    //simpler version

    // router.post("/daily-journal", (req, res, next) => {
    //     const {title, content, author} = req.body;
    
    //     Journal.create({title, content, author})
    //     .then((journalPost) => {
    //         console.log(journalPost)
    //         res.redirect("/journal-list");
    //     })
    //     .catch(err => next(err));
    //     })

    router.get("/journal-list", (req, res, next)=> {
        Journal.find()
        .then(journalsFromDb => {

            console.log(journalsFromDb);
            res.render('journal/journal-list', {journalsFromDb})
        })
        .catch ((err) => {
            next(err);
        })
        


    })


module.exports = router;
