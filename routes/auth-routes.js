var router = require("express").Router();
var passport = require("passport");

// auth login
router.get("/login", function(req, res) {
  res.render("login");
});

//auth logout
router.get("/logout", function(req, res) {
  //handle with passport
  res.send("logging out");
});

//auth with google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"]
  })
);

//callback for google to redirect to
router.get("/google/redirect", passport.authenticate("google"), function(
  req,
  res
) {
  res.send("you reached the callback URI");
});

module.exports = router;
