var db = require("../models");
var axios = require("axios");

module.exports = function(app) {
  // get "/" for select all
  app.get("/", function(req, res) {
    var hndbrsObj = {};
    db.Category.findAll({}).then(function(result) {
      hndbrsObj.categories = result;
    });
    var url =
      "https://api.data.charitynavigator.org/v2/Organizations?app_id=" +
      process.env.APP_ID +
      "&app_key=" +
      process.env.APP_KEY +
      "&rated=true&pageSize=12&sort=RATING%3ADESC";

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
          currentRatingImg: result.data[i].currentRating.ratingImage.small,
          country: result.data[i].mailingAddress.country,
          state: result.data[i].mailingAddress.stateOrProvince
        };
        charities.push(charity);
        charities.categoryName = "all categories";
      }
      hndbrsObj.charities = charities;
      res.render("index", hndbrsObj);
    });
  });

  app.get("/category/:categoryID", function(req, res) {
    var hndbrsObj = {};
    db.Category.findAll({}).then(function(result) {
      hndbrsObj.categories = result;
    });

    var url =
      "https://api.data.charitynavigator.org/v2/Organizations?app_id=" +
      process.env.APP_ID +
      "&app_key=" +
      process.env.APP_KEY +
      "&rated=true&categoryID=" +
      req.params.categoryID +
      "&pageSize=12&sort=RATING%3ADESC";

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
          currentRatingImg: result.data[i].currentRating.ratingImage.small,
          country: result.data[i].mailingAddress.country,
          state: result.data[i].mailingAddress.stateOrProvince
        };
        charities.push(charity);
      }
      charities.categoryName = result.data[0].category.categoryName;
      charities.categoryID = req.params.categoryID;
      console.log(charities.categoryID);
      hndbrsObj.charities = charities;
      res.render("index", hndbrsObj);
    });
  });

  app.get("/charity/:ein", function(req, res) {
    var charityObj = {};

    var urlOneCharity =
      "https://api.data.charitynavigator.org/v2/Organizations/" +
      req.params.ein +
      "?app_id=" +
      process.env.APP_ID +
      "&app_key=" +
      process.env.APP_KEY;

    var urlAllRatings =
      "https://api.data.charitynavigator.org/v2/Organizations/" +
      req.params.ein +
      "/Ratings?app_id=" +
      process.env.APP_ID +
      "&app_key=" +
      process.env.APP_KEY;

    var urlAllAdvisories =
      "https://api.data.charitynavigator.org/v2/Organizations/" +
      req.params.ein +
      "/Advisories/?app_id=" +
      process.env.APP_ID +
      "&app_key=" +
      process.env.APP_KEY;

    apiCall(urlOneCharity, function(charityData) {
      var causeID = parseInt(charityData.data.cause.causeID);
      // charityObj.causeID = charityData.data.cause.causeID;
      // charityObj.causeName = charityData.data.cause.causeID;
      var relatedCharitiesurl =
        "https://api.data.charitynavigator.org/v2/Organizations?app_id=" +
        process.env.APP_ID +
        "&app_key=" +
        process.env.APP_KEY +
        "&pageSize=12&rated=true&causeID=" +
        causeID +
        "&sort=RATING%3ADESC";
      apiCall(relatedCharitiesurl, function(relatedCharities) {
        var charities = [];
        for (var j = 0; j < relatedCharities.data.length; j++) {
          var charity = {
            charityNavigatorURL: relatedCharities.data[j].charityNavigatorURL,
            charityURL: relatedCharities.data[j].websiteURL,
            tagLine: relatedCharities.data[j].tagLine,
            name: relatedCharities.data[j].charityName,
            ein: relatedCharities.data[j].ein,
            currentRating: relatedCharities.data[j].currentRating.rating,
            currentRatingImg:
              relatedCharities.data[j].currentRating.ratingImage.small,
            country: relatedCharities.data[j].mailingAddress.country,
            state: relatedCharities.data[j].mailingAddress.stateOrProvince
          };
          charities.push(charity);
        }
        charityObj.charities = charities;

        charityObj.ein = charityData.data.ein;
        charityObj.charityName = charityData.data.charityName;
        charityObj.causeID = charityData.data.cause.causeID;
        charityObj.causeName = charityData.data.cause.causeName;
        charityObj.tagLine = charityData.data.tagLine;
        charityObj.websiteURL = charityData.data.websiteURL;
        charityObj.charityNavigatorURL = charityData.data.charityNavigatorURL;
        charityObj.charityEmail = charityData.data.generalEmail;
        charityObj.mission = charityData.data.mission;
        charityObj.city = charityData.data.mailingAddress.city;
        charityObj.state = charityData.data.mailingAddress.stateOrProvince;
        charityObj.country = charityData.data.mailingAddress.country;

        apiCall(urlAllRatings, function(rating) {
          var urlOneRating =
            "https://api.data.charitynavigator.org/v2/Organizations/" +
            req.params.ein +
            "/Ratings/" +
            rating.data[0].ratingID +
            "?app_id=" +
            process.env.APP_ID +
            "&app_key=" +
            process.env.APP_KEY;
          apiCall(urlOneRating, function(ratingData) {
            var admRatio =
              ratingData.data.financialRating.performanceMetrics
                .administrationExpensesRatio;
            if (typeof admRatio !== "number") {
              admRatio =
                ratingData.data.form990.administrativeExpenses /
                ratingData.data.form990.totalExpenses;
            }
            var progRatio =
              ratingData.data.financialRating.performanceMetrics
                .programExpensesRatio;
            if (typeof progRatio !== "number") {
              progRatio =
                ratingData.data.form990.programExpenses /
                ratingData.data.form990.totalExpenses;
            }
            var fundRatio =
              ratingData.data.financialRating.performanceMetrics
                .fundraisingExpensesRatio;
            if (typeof fundRatio !== "number") {
              fundRatio =
                ratingData.data.form990.fundraisingExpenses /
                ratingData.data.form990.totalExpenses;
            }
            charityObj.currentRating = ratingData.data.rating;
            charityObj.currentScore = ratingData.data.score;
            charityObj.ratingDate = ratingData.data.publicationDate;
            charityObj.ratingImg = ratingData.data.ratingImage.large;
            charityObj.fundraisingExpenses =
              ratingData.data.form990.fundraisingExpenses;
            charityObj.administrativeExpenses =
              ratingData.data.form990.administrativeExpenses;
            charityObj.programExpenses =
              ratingData.data.form990.programExpenses;
            charityObj.totalExpenses = ratingData.data.form990.totalExpenses;
            charityObj.totalRevenue = ratingData.data.form990.totalRevenue;
            charityObj.totalExpenses = ratingData.data.form990.totalExpenses;
            charityObj.totalContributions =
              ratingData.data.form990.totalContributions;
            charityObj.totalNetAssets = ratingData.data.form990.totalNetAssets;
            charityObj.primaryRevenue = ratingData.data.form990.primaryRevenue;
            charityObj.otherRevenue = ratingData.data.form990.otherRevenue;
            charityObj.programExpensesRatio = progRatio;
            charityObj.fundraisingExpenseRatio = fundRatio;
            charityObj.administrationExpensesRatio = admRatio;
            apiCall(urlAllAdvisories, function(advisoryData) {
              var advisories = [];
              for (var i = 0; i < advisoryData.data.length; i++) {
                var advisory = {
                  severity: advisoryData.data[i].severity,
                  datePublished: advisoryData.data[i].datePublished,
                  sources: advisoryData.data[i].sources
                };
                advisories.push(advisory);
                charityObj.advisories = advisories;
              }
              res.render("charityInfo", charityObj);
            });
          });
        });
      });
    });
  });

  app.get("/profile", function(req, res) {
    console.log("hit");
    var hndbrsObj = {};
    db.Charity.findAll({
      where: {
        UserId: 1
      },
      include: [db.User]
    }).then(function(dbUser) {
      db.UserCategory.findAll({
        where: {
          UserId: 1
        },
        include: [db.Category]
      }).then(function(dbCategory) {
        var savedCharities = [];
        for (var i = 0; i < dbUser.length; i++) {
          var urlOneCharity =
            "https://api.data.charitynavigator.org/v2/Organizations/" +
            dbUser[i].charityEin +
            "?app_id=" +
            process.env.APP_ID +
            "&app_key=" +
            process.env.APP_KEY;
          apiCall(urlOneCharity, function(charityData) {
            charity = {};
            charity.ein = charityData.data.ein;
            charity.charityName = charityData.data.charityName;
            charity.causeID = charityData.data.cause.causeID;
            charity.causeName = charityData.data.cause.causeName;
            charity.tagLine = charityData.data.tagLine;
            charity.currentRating = charityData.data.currentRating.rating;
            charity.currentRatingImg =
              charityData.data.currentRating.ratingImage.large;
            charity.websiteURL = charityData.data.websiteURL;
            charity.charityNavigatorURL = charityData.data.charityNavigatorURL;
            charity.charityEmail = charityData.data.generalEmail;
            charity.mission = charityData.data.mission;
            charity.city = charityData.data.mailingAddress.city;
            charity.state = charityData.data.mailingAddress.stateOrProvince;
            charity.country = charityData.data.mailingAddress.country;
            savedCharities.push(charity);
            hndbrsObj.savedCharities = savedCharities;
            hndbrsObj.savedCategories = dbCategory;
            if (hndbrsObj.savedCharities.length === dbUser.length) {
              res.render("profile", hndbrsObj);
            }
          });
        }
      });
    });

    // app.get("/profile", function(req, res) {
    //   console.log("hit");
    //   var hndbrsObj = {};
    //   db.Charity.findAll({
    //     where: {
    //       UserId: 1
    //     },
    //     include: [db.User]
    //   }).then(function(dbUser) {
    //     //res.json(dbUser);
    //     var savedCharities = [];
    //     var multiURL = [];
    //     for (var i = 0; i < dbUser.length; i++) {
    //       multiURL.push(multiApiGet(dbUser.charityEin));

    //       // apiCall(urlOneCharity, function(charityData) {
    //       //   charity = {};
    //       //   charity.ein = charityData.data.ein;
    //       //   charity.charityName = charityData.data.charityName;
    //       //   charity.causeID = charityData.data.cause.causeID;
    //       //   charity.causeName = charityData.data.cause.causeName;
    //       //   charity.tagLine = charityData.data.tagLine;
    //       //   charity.websiteURL = charityData.data.websiteURL;
    //       //   charity.charityNavigatorURL = charityData.data.charityNavigatorURL;
    //       //   charity.charityEmail = charityData.data.generalEmail;
    //       //   charity.mission = charityData.data.mission;
    //       //   charity.city = charityData.data.mailingAddress.city;
    //       //   charity.state = charityData.data.mailingAddress.stateOrProvince;
    //       //   charity.country = charityData.data.mailingAddress.country;

    //       //   savedCharities.push(charity);

    //       //   hndbrsObj.savedCharities = savedCharities;
    //       //});
    //       // hndbrsObj.savedCharities = savedCharities;
    //       // console.log("\n the handlebars ----------------");
    //       // console.log(hndbrsObj);
    //       // res.render("profile", hndbrsObj);
    //     }
    //     console.log(multiURL);
    //     axios.all(multiURL).then(function(response){
    //       console.log(response);
    //     });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

// function multiApiGet(ein) {
//   return axios.get(
//     "https://api.data.charitynavigator.org/v2/Organizations/" +
//       ein +
//       "?app_id=" +
//       process.env.APP_ID +
//       "&app_key=" +
//       process.env.APP_KEY
//   );
// }

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

// function pickURL(keyword, ein, categoryID, ratingID, advisoryID, numRecords) {
//   var ein = ein || "";
//   var categoryID = categoryID || "";
//   var ratingID = ratingID || "";
//   var advisoryID = advisoryID || "";
//   //var url = "";
//   switch (keyword) {
//     case "charitiesAll":
//       url =
//         "https://api.data.charitynavigator.org/v2/Organizations?app_id=" +
//         process.env.APP_ID +
//         "&app_key=" +
//         process.env.APP_KEY +
//         "&rated=true";
//     case "charitiesLimit5":
//       console.log("this is the one");
//       url =
//         "https://api.data.charitynavigator.org/v2/Organizations?app_id=" +
//         process.env.APP_ID +
//         "&app_key=" +
//         process.env.APP_KEY +
//         "&rated=true&pageSize=" +
//         numRecords;
//     case "oneCharity":
//       url =
//         "https://api.data.charitynavigator.org/v2/Organizations/" +
//         ein +
//         "?app_id=" +
//         process.env.APP_ID +
//         "&app_key=" +
//         process.env.APP_KEY;
//     case "charitiesByCategoryAll":
//       // // call organizations for one category - no limit
//       url =
//         "https://api.data.charitynavigator.org/v2/Organizations?app_id=" +
//         process.env.APP_ID +
//         "&app_key=" +
//         process.env.APP_KEY +
//         "&rated=true&categoryID=" +
//         categoryId;

//     case "charitiesByCategoryLimit5":
//       url =
//         "https://api.data.charitynavigator.org/v2/Organizations?app_id=" +
//         process.env.APP_ID +
//         "&app_key=" +
//         process.env.APP_KEY +
//         "&rated=true&categoryID=" +
//         categoryId +
//         "&pageSize=" +
//         numRecords;
//   }
//   return url;
// }

// one organization based on an EIN
// var urlOneCharity =
//   "https://api.data.charitynavigator.org/v2/Organizations/" +
//   req.params.ein +
//   "?app_id=" +
//   process.env.APP_ID +
//   "&app_key=" +
//   process.env.APP_KEY;
// // call organizations for one category - no limit

// all categories
// var urlCategories =
//   "https://api.data.charitynavigator.org/v2/Categories?app_id=" +
//   process.env.APP_ID +
//   "&app_key=" +
//   process.env.APP_KEY;
// // all ratings for a single charity
// var urlAllRatings =
//   "https://api.data.charitynavigator.org/v2/Organizations/" +
//   req.params.ein +
//   "/Ratings?app_id=" +
//   process.env.APP_ID +
//   "&app_key=" +
//   process.env.APP_KEY;
// // one rating for a single charity based on a rating id
// var urlOneRating =
//   "https://api.data.charitynavigator.org/v2/Organizations/" +
//   req.params.ein +
//   "/Ratings/" +
//   req.params.id +
//   "?app_id=" +
//   process.env.APP_ID +
//   "&app_key=" +
//   process.env.APP_KEY;
// // all advisories for a single charity
// var urlAllAdvisories =
//   "https://api.data.charitynavigator.org/v2/Organizations/" +
//   req.params.ein +
//   "/Advisories/?app_id=" +
//   process.env.APP_ID +
//   "&app_key=" +
//   process.env.APP_KEY;
// // one advisory for a single charity based on a advisory id
// var urlOneAdvisory =
//   "https://api.data.charitynavigator.org/v2/Organizations/" +
//   req.params.ein +
//   "/Advisories/" +
//   req.params.id +
//   "?app_id=" +
//   process.env.APP_ID +
//   "&app_key=" +
//   process.env.APP_KEY

// // Load index page
// app.get("/", function(req, res) {
//   db.Example.findAll({}).then(function(dbExamples) {
//     res.render("index", {
//       msg: "Welcome!",
//       examples: dbExamples
//     });
//   });
// });

// Load example page and pass in an example by id

// // api to get all organizations - will return up to 100 results
// app.get("/", function(req, res) {
//   //console.log(res);
//   //app.get("/api/organizations", function(apireq, apires) {
//   var url =
//     "https://api.data.charitynavigator.org/v2/Organizations?app_id=" +
//     process.env.APP_ID +
//     "&app_key=" +
//     process.env.APP_KEY +
//     "&rated=true";
//   apiCall(url, function(result) {
//     var charities = [];
//     for (var i = 0; i < result.data.length; i++) {
//       var charity = {
//         charityNavigatorURL: result.data[i].charityNavigatorURL,
//         charityURL: result.data[i].websiteURL,
//         tagLine: result.data[i].tagLine,
//         name: result.data[i].charityName,
//         ein: result.data[i].ein,
//         currentRating: result.data[i].currentRating.rating,
//         currentRatingImg: result.data[i].currentRating.ratingImage.large,
//         country: result.data[i].mailingAddress.country,
//         state: result.data[i].mailingAddress.stateOrProvince
//       };
//       charities.push(charity);
//     }
//     //console.log(charities[0]);
//     res.render("index", { charities: charities });
//     //res.json(charities);
//     // ENTER ANY FUNCTION TO DO SOMETHING HERE
//   });
// });
// //console.log(req);
// //});

// // api to get all organizations - will return up to 100 results
// app.get("/api/organizations/:ein", function(req, res) {
//   var url =
//     "https://api.data.charitynavigator.org/v2/Organizations/" +
//     req.params.ein +
//     "?app_id=" +
//     process.env.APP_ID +
//     "&app_key=" +
//     process.env.APP_KEY;
//   console.log(url + "line 52");
//   apiCall(url, function(result) {
//     var charity = {
//       charityNavigatorURL: result.data.charityNavigatorURL,
//       charityURL: result.data.websiteURL,
//       tagLine: result.data.tagLine,
//       name: result.data.charityName,
//       ein: result.data.ein,
//       currentRating: result.data.currentRating.rating,
//       currentRatingImg: result.data.currentRating.ratingImage.large,
//       country: result.data.mailingAddress.country,
//       state: result.data.mailingAddress.stateOrProvince
//     };
//     res.json(charity);
//     // ENTER ANY FUNCTION TO DO SOMETHING HERE
//   });
// });

// // api to get all organizations with category - will return up to 100 results
// app.get("/api/organizations/category/:categoryId", function(req, res) {
//   var url =
//     "https://api.data.charitynavigator.org/v2/Organizations?app_id=" +
//     process.env.APP_ID +
//     "&app_key=" +
//     process.env.APP_KEY +
//     "&rated=true&categoryID=" +
//     req.params.categoryId;
//   console.log(url);
//   apiCall(url, function(result) {
//     var charities = [];
//     for (var i = 0; i < result.data.length; i++) {
//       var charity = {
//         charityNavigatorURL: result.data[i].charityNavigatorURL,
//         charityURL: result.data[i].websiteURL,
//         tagLine: result.data[i].tagLine,
//         name: result.data[i].charityName,
//         ein: result.data[i].ein,
//         currentRating: result.data[i].currentRating.rating,
//         currentRatingImg: result.data[i].currentRating.ratingImage.large,
//         country: result.data[i].mailingAddress.country,
//         state: result.data[i].mailingAddress.stateOrProvince
//       };
//       charities.push(charity);
//     }
//     res.json(charities);
//     // ENTER ANY FUNCTION TO DO SOMETHING HERE
//   });
// });

// // api to get all categories available in charity navigator
// app.get("/api/categories", function(req, res) {
//   var url =
//     "https://api.data.charitynavigator.org/v2/Categories?app_id=" +
//     process.env.APP_ID +
//     "&app_key=" +
//     process.env.APP_KEY;
//   apiCall(url, function(result) {
//     var categories = [];
//     for (var i = 0; i < result.data.length; i++) {
//       console.log(result.data[i].categoryID, result.data[i].categoryName);
//       var category = {
//         name: result.data[i].categoryName,
//         id: result.data[i].categoryID
//       };
//       categories.push(category);
//     }
//     res.json(categories);
//     // ENTER ANY FUNCTION TO DO SOMETHING HERE
//   });
// });

// // api to get all ratings associated with a charity's TaxID (EIN)
// app.get("/api/ratings/:ein", function(req, res) {
//   var url =
//     "https://api.data.charitynavigator.org/v2/Organizations/" +
//     req.params.ein +
//     "/Ratings?app_id=" +
//     process.env.APP_ID +
//     "&app_key=" +
//     process.env.APP_KEY;
//   apiCall(url, function(result) {
//     var charities = [];
//     for (var i = 0; i < result.data.length; i++) {
//       var charity = {
//         ratingId: result.data[i].ratingID
//       };
//       charities.push(charity);
//     }
//     res.json(charities);
//     // ENTER ANY FUNCTION TO DO SOMETHING HERE
//   });
// });

// // api to get all ratings associated with a charity's TaxID (EIN) and Rating ID - this will return
// // info about costs and where they spend their money
// app.get("/api/ratings/:ein/:id", function(req, res) {
//   var url =
//     "https://api.data.charitynavigator.org/v2/Organizations/" +
//     req.params.ein +
//     "/Ratings/" +
//     req.params.id +
//     "?app_id=" +
//     process.env.APP_ID +
//     "&app_key=" +
//     process.env.APP_KEY;
//   console.log(url + " on line 157");
//   apiCall(url, function(result) {
//     var rating = {
//       ratingId: result.data.ratingId,
//       publicationDate: result.data.publicationDate,
//       fundraisingExpenses: result.data.form990.fundraisingExpenses,
//       administrativeExpenses: result.data.form990.administrativeExpenses,
//       programExpenses: result.data.form990.programExpenses,
//       totalExpenses: result.data.form990.totalExpenses,
//       totalRevenue: result.data.form990.totalRevenue,
//       totalExpenses: result.data.form990.totalExpenses,
//       totalContributions: result.data.form990.totalContributions,
//       totalNetAssets: result.data.form990.totalNetAssets,
//       primaryRevenue: result.data.form990.primaryRevenue,
//       otherRevenue: result.data.form990.otherRevenue
//     };
//     res.json(rating);
//     // ENTER ANY FUNCTION TO DO SOMETHING HERE
//   });
// });

// // api to get all advisories associated with a charity's EIN or TaxID
// app.get("/api/advisories/:ein", function(req, res) {
//   var url =
//     "https://api.data.charitynavigator.org/v2/Organizations/" +
//     req.params.ein +
//     "/Advisories/?app_id=" +
//     process.env.APP_ID +
//     "&app_key=" +
//     process.env.APP_KEY;
//   apiCall(url, function(result) {
//     var advisories = [];
//     for (var i = 0; i < result.data.length; i++) {
//       var advisory = {
//         severity: result.data[i].severity,
//         datePublished: result.data[i].datePublished,
//         sources: result.data[i].sources
//       };
//       advisories.push(advisory);
//     }
//     res.json(advisories);
//     // ENTER ANY FUNCTION TO DO SOMETHING HERE
//   });
// });

// // api to get all advisories associated with a charity's EIN or TaxID based on a specific advisory id
// app.get("/api/advisories/:ein/:id", function(req, res) {
//   var url =
//     "https://api.data.charitynavigator.org/v2/Organizations/" +
//     req.params.ein +
//     "/Advisories/" +
//     req.params.id +
//     "?app_id=" +
//     process.env.APP_ID +
//     "&app_key=" +
//     process.env.APP_KEY;
//   apiCall(url, function(result) {
//     console.log(result.data);
//     res.end();
//     // ENTER ANY FUNCTION TO DO SOMETHING HERE
//   });
// });
