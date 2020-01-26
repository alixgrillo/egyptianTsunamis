//var db = require("../models");
var axios = require("axios");

module.exports = function(app) {
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
  app.get("/api/organizations", function(req, res) {
    var url =
      "https://api.data.charitynavigator.org/v2/Organizations?app_id=" +
      process.env.APP_ID +
      "&app_key=" +
      process.env.APP_KEY +
      "&rated=true";
    apiCall(url, function(result) {
      console.log(result.data);
      res.end();
      // ENTER ANY FUNCTION TO DO SOMETHING HERE
    });
  });

  // api to get all organizations - will return up to 100 results
  app.get("/api/organizations/:ein", function(req, res) {
    var url =
      "https://api.data.charitynavigator.org/v2/Organizations/" +
      req.params.ein +
      "?app_id=" +
      process.env.APP_ID +
      "&app_key=" +
      process.env.APP_KEY;
    console.log(url + "line 52");
    apiCall(url, function(result) {
      var charity = {
        charityNavigatorURL: result.data.charityNavigatorURL,
        charityURL: result.data.websiteURL,
        tagLine: result.data.tagLine,
        name: result.data.charityName,
        ein: result.data.ein,
        currentRating: result.data.currentRating.rating,
        currentRatingImg: result.data.currentRating.ratingImage.large,
        country: result.data.mailingAddress.country,
        state: result.data.mailingAddress.stateOrProvince
      };
      res.json(charity);
      // ENTER ANY FUNCTION TO DO SOMETHING HERE
    });
  });

  // api to get all organizations with category - will return up to 100 results
  app.get("/api/organizations/category/:categoryId", function(req, res) {
    var url =
      "https://api.data.charitynavigator.org/v2/Organizations?app_id=" +
      process.env.APP_ID +
      "&app_key=" +
      process.env.APP_KEY +
      "&rated=true&categoryID=" +
      req.params.categoryId;
    console.log(url);
    apiCall(url, function(result) {
      var charities = [];
      for (var i = 0; i < result.data.length; i++) {
        var charity = {
          charityNavigatorURL: result.data[i].charityNavigatorURL,
          charityURL: result.data[i].websiteURL,
          tagLine: result.data[i].tagLine,
          name: result.data[i].charityName,
          ein: result.data[i].ein,
          currentRating: result.data[i].currentRating.rating,
          currentRatingImg: result.data[i].currentRating.ratingImage.large,
          country: result.data[i].mailingAddress.country,
          state: result.data[i].mailingAddress.stateOrProvince
        };
        charities.push(charity);
      }
      res.json(charities);
      // ENTER ANY FUNCTION TO DO SOMETHING HERE
    });
  });

  // api to get all categories available in charity navigator
  app.get("/api/categories", function(req, res) {
    var url =
      "https://api.data.charitynavigator.org/v2/Categories?app_id=" +
      process.env.APP_ID +
      "&app_key=" +
      process.env.APP_KEY;
    apiCall(url, function(result) {
      var categories = [];
      for (var i = 0; i < result.data.length; i++) {
        console.log(result.data[i].categoryID, result.data[i].categoryName);
        var category = {
          name: result.data[i].categoryName,
          id: result.data[i].categoryID
        };
        categories.push(category);
      }
      res.json(categories);
      // ENTER ANY FUNCTION TO DO SOMETHING HERE
    });
  });

  // api to get all ratings associated with a charity's TaxID (EIN)
  app.get("/api/ratings/:ein", function(req, res) {
    var url =
      "https://api.data.charitynavigator.org/v2/Organizations/" +
      req.params.ein +
      "/Ratings?app_id=" +
      process.env.APP_ID +
      "&app_key=" +
      process.env.APP_KEY;
    apiCall(url, function(result) {
      var charities = [];
      for (var i = 0; i < result.data.length; i++) {
        var charity = {
          ratingId: result.data[i].ratingID
        };
        charities.push(charity);
      }
      res.json(charities);
      // ENTER ANY FUNCTION TO DO SOMETHING HERE
    });
  });

  // api to get all ratings associated with a charity's TaxID (EIN) and Rating ID - this will return
  // info about costs and where they spend their money
  app.get("/api/ratings/:ein/:id", function(req, res) {
    var url =
      "https://api.data.charitynavigator.org/v2/Organizations/" +
      req.params.ein +
      "/Ratings/" +
      req.params.id +
      "?app_id=" +
      process.env.APP_ID +
      "&app_key=" +
      process.env.APP_KEY;
    console.log(url + " on line 157");
    apiCall(url, function(result) {
      var rating = {
        ratingId: result.data.ratingId,
        publicationDate: result.data.publicationDate,
        fundraisingExpenses: result.data.form990.fundraisingExpenses,
        administrativeExpenses: result.data.form990.administrativeExpenses,
        programExpenses: result.data.form990.programExpenses,
        totalExpenses: result.data.form990.totalExpenses,
        totalRevenue: result.data.form990.totalRevenue,
        totalExpenses: result.data.form990.totalExpenses,
        totalContributions: result.data.form990.totalContributions,
        totalNetAssets: result.data.form990.totalNetAssets,
        primaryRevenue: result.data.form990.primaryRevenue,
        otherRevenue: result.data.form990.otherRevenue
      };
      res.json(rating);
      // ENTER ANY FUNCTION TO DO SOMETHING HERE
    });
  });

  // api to get all advisories associated with a charity's EIN or TaxID
  app.get("/api/advisories/:ein", function(req, res) {
    var url =
      "https://api.data.charitynavigator.org/v2/Organizations/" +
      req.params.ein +
      "/Advisories/?app_id=" +
      process.env.APP_ID +
      "&app_key=" +
      process.env.APP_KEY;
    apiCall(url, function(result) {
      var advisories = [];
      for (var i = 0; i < result.data.length; i++) {
        var advisory = {
          severity: result.data[i].severity,
          datePublished: result.data[i].datePublished,
          sources: result.data[i].sources
        };
        advisories.push(advisory);
      }
      res.json(advisories);
      // ENTER ANY FUNCTION TO DO SOMETHING HERE
    });
  });

  // api to get all advisories associated with a charity's EIN or TaxID based on a specific advisory id
  app.get("/api/advisories/:ein/:id", function(req, res) {
    var url =
      "https://api.data.charitynavigator.org/v2/Organizations/" +
      req.params.ein +
      "/Advisories/" +
      req.params.id +
      "?app_id=" +
      process.env.APP_ID +
      "&app_key=" +
      process.env.APP_KEY;
    apiCall(url, function(result) {
      console.log(result.data);
      res.end();
      // ENTER ANY FUNCTION TO DO SOMETHING HERE
    });
  });

  function apiCall(url, cb) {
    axios
      .get(url)
      .then(function(response) {
        return cb(response);
      })
      .catch(function(error) {
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
