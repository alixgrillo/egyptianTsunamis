var router = require("express").Router();
var passport = require("passport");

// auth login
router.get('/login', (req, res) => {
  res.render('login', { user: req.user });
});

//auth logout
router.get("/logout", function(req, res) {
  //handle with passport
  req.logout();
  res.redirect("/");
});

//auth with google
router.get("/google", passport.authenticate("google", {
    scope: ["profile"]
  }));

//callback for google to redirect to
router.get("/google/redirect", passport.authenticate("google"), function (
  req, res) {
  res.redirect("/profile");
});

module.exports = router;
