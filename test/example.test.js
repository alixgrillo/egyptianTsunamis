var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

describe("GET / for categories", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("should find all examples", function(done) {
    // Add some examples to the db to test with
    db.Example.bulkCreate([
      { category: "Animals", categoryID: 8, iconName: "fa fa-animals" },
      { category: "Health", categoryID: 3, iconName: "fa fa-health" }
    ]).then(function() {
      // Request the route that returns all examples
      request.get("/").end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body.categories;

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an("array")
          .that.has.lengthOf(2);

        expect(responseBody[0])
          .to.be.an("object")
          .that.includes({
            category: "Animals",
            categoryID: 8,
            iconName: "fa fa-animals"
          });

        expect(responseBody[1])
          .to.be.an("object")
          .that.includes({
            category: "Health",
            categoryID: 3,
            iconName: "fa fa-health"
          });

        // The `done` function is used to end any asynchronous tests
        done();
      });
    });
  });
});
