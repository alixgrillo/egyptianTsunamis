var router = require("express").Router();

var authCheck = function(req, res, next) {
  if (!req.session.passport) {
    res.redirect("/auth/login");
    console.log("not a user");
  } else {
    console.log("USER!!!");
    next();
  }
};

router.get("/", authCheck, function(req, res) {
  res.render("profile", { user: req.session.passport });
  // + req.user.username);
});

module.exports = router;
