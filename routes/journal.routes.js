const router = require("express").Router();

const User = require("../model/user.model");
const Journal = require("../model/journal.model");
const { isLoggedIn } = require("../middleware/loggedInOut");

router.get("/daily-journal", isLoggedIn, (req, res) => {
  res.render("journal/daily-journal", {
    userInSession: req.session.currentUser,
  });
});

//journal post
const fileUploader = require("../config/cloudinary.config");

router.post(
  "/daily-journal",
  fileUploader.single("journal-post-image"),
  (req, res, next) => {
    const { title, content, createdAt } = req.body;
    const userId = req.session.currentUser._id; // current user ID
    const body = { title, content, createdAt, author: userId };

    if (req.file) {
      body.imageUrl = req.file.path;
    }

    // console.log("currentUser", req.session.currentUser)
    // console.log("currentUserID", req.session.currentUser._id)
    // console.log("currentUserUsername", req.session.currentUser.username)

    Journal.create(body)
      .then((journalPost) => {
        console.log("journalPost", journalPost);
        return User.findByIdAndUpdate(userId, {
          $push: { journals: journalPost._id },
        });
      })
      .then(() => res.redirect("/journal-list")) // need to get!
      .catch((err) => {
        console.log("error to get the journal creation!");
        next(err);
      });
  }
);

router.get("/journal-list", isLoggedIn, (req, res, next) => {
  const userId = req.session.currentUser._id;

  User.findById(userId)
    .populate("journals")
    .then((user) => {
      const journals = user.journals;

      console.log(journals);
      res.render("journal/journal-list", { journals });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/daily-journal/:journalId", isLoggedIn, (req, res, next) => {
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

router.get("/daily-journal/:journalId/edit", isLoggedIn, (req, res, next) => {
  const { journalId } = req.params;

  Journal.findById(journalId)
    .then((journalToEdit) =>
      res.render("journal/edit-journal", { journal: journalToEdit })
    )
    .catch((error) => next(error));
});

router.post(
  "/daily-journal/:journalId/edit",
  fileUploader.single("journal-post-image"),
  (req, res, next) => {
    const { journalId } = req.params;
    const { author, title, content, createdAt, existingImage } = req.body;

    let imageUrl;
    if (req.file) {
      imageUrl = req.file.path;
    } else {
      imageUrl = existingImage;
    }

    Journal.findByIdAndUpdate(
      journalId,
      { author, title, content, createdAt, imageUrl },
      { new: true }
    )
      .then(
        (updatedJournal) => res.redirect("/journal-list/")
        // res.redirect(`/daily-journal/${updatedJournal.id}`)
      )
      .catch((error) => next(error));
  }
);

module.exports = router;
