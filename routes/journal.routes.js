const router = require("express").Router();
const User = require("../model/user.model");
const Journal = require("../model/journal.model");


// simpler version
// router.get("/daily-journal", ensureAuthenticated, (req, res) => {
//     res.render("journal/daily-journal", { userInSession: req.session.currentUser });
//   });

//journal form get 
router.get("/daily-journal", (req, res) => { 

    try {
        console.log("success")
        res.render("journal/daily-journal", { userInSession: req.session.currentUser });
      } catch (error) {
        // Handle any errors that occur during rendering or authentication
        console.error("Error rendering daily journal page:", error);
        res.status(500).send("Internal Server Error"); // You can customize the error response as needed
      }

})

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
    .catch(err => {
        console.log(
            "error to get the journal creation!");
        next(err) });
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

router.get("/daily-journal/journalId", (req, res, next)=> {
   const {journalId} = req.params;

    Journal.find(journalId)
     .then(foundedJournal => {

    console.log(foundedJournal);
    res.render('journal/journal-list', {journalsFromDb})
     })
    .catch ((err) => {
     next(err);
    })

})

module.exports = router;
