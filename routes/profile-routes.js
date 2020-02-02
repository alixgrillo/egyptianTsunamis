var authCheck = function(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    console.log("/auth/login");
  }
};

module.exports = authCheck;
