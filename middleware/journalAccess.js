function ensureAuthenticated(req, res, next) {
    if (req.session.currentUser) {
      // User is authenticated, allow access to the route
      return next();
    } else if (req.headers.referer === "http://localhost:3000/userProfile"){
      res.redirect("/userProfile"); // Redirect to the profile page (meaning the user loggs in)
    } else {
  res.redirect("/login");} 
 }  


 //req.headers.referer is used to access the Referer header 
 // in the Express.js request object (req). It allows you to check which page the user 
 // was on before trying to access the protected route.