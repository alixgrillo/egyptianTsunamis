const router = require('express').Router();

const authCheck = (req, res, next) => {
    if(!req.session.passport){
        res.redirect('/auth/login');
        console.log("not a user")
    } else {
        console.log("USER!!!")
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    res.render("profile", {user: req.session.passport})
    // + req.user.username);
});

module.exports = router;