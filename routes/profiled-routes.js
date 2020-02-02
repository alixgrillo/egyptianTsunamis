var router = require('express').Router();
var authCheck = require("./profile-routes");

router.get('/', authCheck, (req, res) => {
    res.render("profiled", {user: req.session.passport})
    // + req.user.username);
  });

  module.exports=router;