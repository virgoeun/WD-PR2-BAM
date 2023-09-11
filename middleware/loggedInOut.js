

function isLoggedOut (req, res, next) {
  if (req.session.currentUser) {
    return res.redirect("/");
  }
  next();
};

function isLoggedIn (req, res, next) {
  if (!req.session.currentUser) {
    return res.redirect("/login");
  }
  next();
};

module.exports = { isLoggedOut, isLoggedIn };
