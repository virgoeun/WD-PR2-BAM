// Middleware to protect login and signup routes from logged-in users
function ensureNotLoggedIn(req, res, next) {
    if (req.session.currentUser) {
      // User is already logged in, redirect to their profile page
      return res.redirect("/userProfile");
    }
    // User is not logged in, proceed to the login/signup route
    next();
  }
  
  module.exports = ensureNotLoggedIn