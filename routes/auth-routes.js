var router = require("express").Router();
var passport = require("passport");

// auth login
router.get("/login", function(req, res) {
  res.render("login", { user: req.user });
});

//auth logout
router.get("/logout", function(req, res) {
  //handle with passport
  console.log("auth-routes 12 : Logging Out User: " + req.user.name);
  console.log("auth-routes 12 : Logging Out User: " + req.session);
  res.clearCookie('sid', {path: '/'});
  res.redirect('/');
  req.logOut();
  req.session=null;
  delete req.session;
  delete req.user;
  req.user=null;
  res.clearCookie('sid', {path: '/'});
  res.redirect('/');
});


// Express middleware function for logging out a user. The action is successful
// if the user is no longer authenticated.
// router.get("/logout", function (req, res, next) {
//   // Get rid of the session token. Then call `logout`; it does no harm.
//   req.logout();
//   req.session.destroy(function (err) {
//     if (err) { return next(err); }
//     // The response should indicate that the user is no longer authenticated.
//     return res.send({ authenticated: req.isAuthenticated() });
//   });
// });

//auth with google
router.get("/google", passport.authenticate("google", {
    scope: ["profile"]
  }));

//callback for google to redirect to
router.get("/google/redirect", passport.authenticate("google", 
  { 
    successRedirect: '/',
    failureRedirect: '/auth/login'
}
));


module.exports = router;
