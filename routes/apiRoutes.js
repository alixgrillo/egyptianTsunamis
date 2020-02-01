var db = require("../models");

module.exports = function(app) {
  /// NEED TO UPDATE USER ID TO COOKIE
  // Making sure this merged correctly
  app.post("/api/charitySave", function(req, res) {
    console.log(req.body);
    db.Charity.create({
      charityEin: req.body.charityEin,
      UserId: 1
    }).then(function(dbCharity) {
      res.json(dbCharity);
    });
  });

  app.post("/api/categorySave", function(req, res) {
    console.log(req.body);
    db.UserCategory.create({
      category: req.body.category,
      CategoryId: req.body.CategoryId,
      UserId: 1
    }).then(function(dbCategory) {
      res.json(dbCategory);
    });
  });
};
