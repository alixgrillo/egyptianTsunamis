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

  app.post("/api/charitySave/:ein", function(req, res) {
    db.Charity.create({
      charityEin: req.params.ein,
      UserId: req.session.passport.user || 1
    }).then(function(dbCharity) {
      res.json(dbCharity);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
