const router = require("express").Router();
const User = require("../model/user.model");
const Journal = require("../model/journal.model");

// simpler version
// router.get("/daily-journal", (req, res) => {
//   res.render("journal/daily-journal", {
//     userInSession: req.session.currentUser,
//   });
//   console.log(req.session.currentUser)
// });

router.get("/daily-journal", (req, res) => {
    User.find()
    .then((journalUser) => {
       // console.log('journalUser', journalUser);
        res.render("journal/daily-journal", {journalUser});
    })
    .catch((err) => console.log(`Err while displaying journal input: ${err}`))
});

//journal form get
// router.get("/daily-journal", (req, res) => {

//     try {
//         // console.log("success")
//         res.render("journal/daily-journal", { userInSession: req.session.currentUser });
//       } catch (error) {
//         // Handle any errors that occur during rendering or authentication
//         console.error("Error rendering daily journal page:", error);
//         res.status(500).send("Internal Server Error"); // You can customize the error response as needed
//       }

// })

//journal post

router.post("/daily-journal", (req, res, next) => {
  const { title, content, author, createdAt } = req.body;

  Journal.create({ title, content, author, createdAt })
    .then((journalPost) => {
    return User.findByIdAndUpdate(author, { $push: { journals: journalPost._id } });
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

  Journal.find()
  .populate("author")
    .then((myJounals) => {
        //console.log("my journals are:", myJounals)
      res.render("journal/journal-list", { journals: myJounals });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/daily-journal/:journalId", (req, res, next) => {
  const { journalId } = req.params;

  Journal.findById(journalId)
  //.then(data => console.log(data))
    .populate("author")
    .then(data => console.log(data))
    .then((foundedJournal) => {
        // console.log("journal/journal-details", { journal: foundedJournal })
      res.render("journal/journal-details", {journals:foundedJournal});
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

module.exports = router;
