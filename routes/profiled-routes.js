const router = require('express').Router();

router.get('/', (req, res) => {
    res.render("profiled", {user: req.session.passport})
    // + req.user.username);
  });

  module.exports=router;