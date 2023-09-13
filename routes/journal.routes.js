const router = require("express").Router();

const User = require("../model/user.model");
const Journal = require("../model/journal.model");
const { isLoggedIn } = require("../middleware/loggedInOut");

router.get("/daily-journal", (req, res) => { 
  res.render("journal/daily-journal", {
    userInSession: req.session.currentUser,
  });
});

//journal post

router.post("/daily-journal", isLoggedIn, (req, res, next) => {
  const { title, content, createdAt } = req.body;
  const userId = req.session.currentUser._id // current user ID
  
  console.log("currentUser", req.session.currentUser)
  console.log("currentUserID", req.session.currentUser._id)
  console.log("currentUserUsername", req.session.currentUser.username)

  Journal.create({ title, content, author: userId, createdAt }) //author:userId!!! (or author doesn't have any value)
    .then((journalPost) => {
      console.log("journalPost", journalPost)
      return User.findByIdAndUpdate(userId, {
        $push: { journals: journalPost._id },
      });
    })
    .then(() => res.redirect("/journal-list")) // need to get!
    .catch((err) => {
      console.log("error to get the journal creation!");
      next(err);
    });
});

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

router.get("/journal-list", (req, res, next) => {
  const userId = req.session.currentUser._id

  User.findById(userId)
  .populate('journals') // Populate the journals field
  .then(user => {

    const journals = user.journals;
    
    console.log(journals);
    res.render("journal/journal-list", { journals });
  })
  .catch(err => {
    next(err);
  });
});


// router.get("/journal-list", (req, res, next) => {
//   const userId = req.session.currentUser._id

//   Journal.findById(userId)
//     .then((journalsByID) => {
//       console.log(journalsByID);
//       res.render("journal/journal-list", { journalsByID });
//     })
//     .catch((err) => {
//       next(err);
//     });
// });


router.get("/daily-journal/:journalId", (req, res, next) => {
  const { journalId } = req.params;

  Journal.findById(journalId)
    .populate("author")
    .then((foundedJournal) => {
      res.render("journal/journal-details", { journal: foundedJournal });
    })
    .catch((err) => {
      console.log(`Err while getting a single journal from the DB: ${err}`);
      next(err);
    });
});

router.post("/daily-journal/:journalId/delete", (req, res, next) => {
  const { journalId } = req.params;

  Journal.findByIdAndDelete(journalId)
    //.then(() => console.log("deletejournalID:", journalId))
    .then(() => res.redirect("/journal-list"))
    .catch((error) => next(error));
});

router.get("/daily-journal/:journalId/edit", (req, res, next) => {
  const { journalId } = req.params;

  Journal.findById(journalId)
    .then((journalToEdit) =>
      res.render("journal/edit-journal", { journal: journalToEdit })
    )
    .catch((error) => next(error));
});

router.post("/daily-journal/:journalId/edit", (req, res, next) => {
  const { journalId } = req.params;
  const { author, title, content, createdAt } = req.body;

  Journal.findByIdAndUpdate(
    journalId,
    { author, title, content, createdAt },
    { new: true }
  )
    .then((updatedJournal) =>
      res.redirect(`/daily-journal/${updatedJournal.id}`)
    )
    .catch((error) => next(error));
});


//only one users' all journals

// router.get("/daily-journal/:userId/journal-list", (req, res, next) => {
//   const userId = req.session.currentUser._id
//     User.findById(userId)
//       .populate("Journal")
//       .then((foundUser) => {
//         res.render("all-my-journals", { journals: foundUser.journals });
//       })
//       .catch((err) =>
//         console.log(`Error while getting all posts from the DB: ${err}`)
//       );
//   });


module.exports = router;
