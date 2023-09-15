

function isLoggedOut (req, res, next) {
  if (req.session.currentUser) {
    return res.redirect("/"); //If the user is logged in, it redirects them to the root path ("/"); 
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
