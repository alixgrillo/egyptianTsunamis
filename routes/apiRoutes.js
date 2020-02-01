var db = require("../models");

module.exports = function(app) {
  //Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });
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

  // // Delete an example by id
  // app.delete("/api/examples/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(
  //     dbExample
  //   ) {
  //     res.json(dbExample);
  //   });
  // });
};
