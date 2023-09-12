

function isLoggedOut (req, res, next) {
  if (req.session.currentUser) {
    return res.redirect("/userProfile");
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
