var db = require("../models");
var axios = require("axios");

module.exports = function (app) {
  // Get all examples
  // app.get("/api/examples", function (req, res) {
  //   db.Example.findAll({}).then(function (dbExamples) {
  //     res.json(dbExamples);
  //   });
  // });

  // // Create a new example
  // app.post("/api/examples", function (req, res) {
  //   db.Example.create(req.body).then(function (dbExample) {
  //     res.json(dbExample);
  //   });
  // });

  // // Delete an example by id
  // app.delete("/api/examples/:id", function (req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function (
  //     dbExample
  //   ) {
  //     res.json(dbExample);
  //   });
  // });

  // api to get all organizations - will return up to 100 results
  app.get("/api/organizations", function (req, res) {
    var url =
      "https://api.data.charitynavigator.org/v2/Organizations?app_id=" +
      process.env.APP_ID +
      "&app_key=" +
      process.env.APP_KEY +
      "&rated=true";
    apiCall(url, function (result) {
      console.log(result.data);
      // ENTER ANY FUNCTION TO DO SOMETHING HERE
    });
  });

  // api to get all organizations with category - will return up to 100 results
  app.get("/api/organizations/:categoryId", function (req, res) {
    var url =
      "https://api.data.charitynavigator.org/v2/Organizations?app_id=" +
      process.env.APP_ID +
      "&app_key=" +
      process.env.APP_KEY +
      "&rated=true&categoryID=" +
      req.params.categoryId;
    apiCall(url, function (result) {
      console.log(result.data);
      // ENTER ANY FUNCTION TO DO SOMETHING HERE
    });
  });

  // api to get all categories available in charity navigator
  app.get("/api/categories", function (req, res) {
    var url =
      "https://api.data.charitynavigator.org/v2/Categories?app_id=" +
      process.env.APP_ID +
      "&app_key=" +
      process.env.APP_KEY;
    apiCall(url, function (result) {
      for (var i = 0; i < result.data.length; i++) {
        console.log(result.data[i].categoryID, result.data[i].categoryName);
      }
      // ENTER ANY FUNCTION TO DO SOMETHING HERE
    });
  });

  // api to get all ratings associated with a charity's TaxID (EIN)
  app.get("/api/ratings/:ein", function (req, res) {
    var url =
      "https://api.data.charitynavigator.org/v2/Organizations/" +
      req.params.ein +
      "/Ratings?app_id=" +
      process.env.APP_ID +
      "&app_key=" +
      process.env.APP_KEY;
    apiCall(url, function (result) {
      console.log(result.data);
      // ENTER ANY FUNCTION TO DO SOMETHING HERE
    });
  });

  // api to get all ratings associated with a charity's TaxID (EIN) and Rating ID - this will return
  // info about costs and where they spend their money
  app.get("/api/ratings/:ein/:id", function (req, res) {
    var url =
      "https://api.data.charitynavigator.org/v2/Organizations/" +
      req.params.ein +
      "/Ratings/" +
      req.params.id +
      "?app_id=" +
      process.env.APP_ID +
      "&app_key=" +
      process.env.APP_KEY;
    apiCall(url, function (result) {
      console.log(url);
      console.log(result.data);
      // ENTER ANY FUNCTION TO DO SOMETHING HERE
    });
  });


  // api to get all advisories associated with a charity's EIN or TaxID
  app.get("/api/advisories/:ein", function (req, res) {
    var url =
      "https://api.data.charitynavigator.org/v2/Organizations/" +
      req.params.ein +
      "/Advisories/?app_id=" +
      process.env.APP_ID +
      "&app_key=" +
      process.env.APP_KEY;
    apiCall(url, function (result) {
      console.log(result.data);
      // ENTER ANY FUNCTION TO DO SOMETHING HERE
    });
  });

  // api to get all advisories associated with a charity's EIN or TaxID based on a specific advisory id
  app.get("/api/advisories/:ein/:id", function (req, res) {
    var url =
      "https://api.data.charitynavigator.org/v2/Organizations/" +
      req.params.ein +
      "/Advisories/" +
      req.params.id +
      "?app_id=" +
      process.env.APP_ID +
      "&app_key=" +
      process.env.APP_KEY;
    apiCall(url, function (result) {
      console.log(result.data);
      // ENTER ANY FUNCTION TO DO SOMETHING HERE
    });
  });

  function apiCall(url, cb) {
    axios
      .get(url)
      .then(function (response) {
        return cb(response);
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("---------------Data---------------");
          console.log(error.response.data);
          console.log("---------------Status---------------");
          console.log(error.response.status);
          console.log("---------------Status---------------");
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }
};
