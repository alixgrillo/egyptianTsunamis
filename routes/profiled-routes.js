var router = require("express").Router();
var authCheck = require("./profile-routes");
var db = require("../models");
var axios = require("axios");

console.log(authCheck);

router.get("/about", function(req, res) {
  res.render("about");
});

router.get("/", function(req, res) {
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
      var urlAll =
        "https://api.data.charitynavigator.org/v2/Organizations?app_id=" +
        process.env.APP_ID +
        "&app_key=" +
        process.env.APP_KEY +
        "&rated=true&pageSize=12&sort=RATING%3ADESC";
      apiCall(urlAll, function(topRatedCharities) {
        var topRatedCharitiesArr = [];
        for (var i = 0; i < topRatedCharities.data.length; i++) {
          var charity = {
            charityNavigatorURL: topRatedCharities.data[i].charityNavigatorURL,
            charityURL: topRatedCharities.data[i].websiteURL,
            tagLine: topRatedCharities.data[i].tagLine,
            name: topRatedCharities.data[i].charityName,
            ein: topRatedCharities.data[i].ein,
            currentRating: topRatedCharities.data[i].currentRating.rating,
            currentRatingImg:
              topRatedCharities.data[i].currentRating.ratingImage.small,
            country: topRatedCharities.data[i].mailingAddress.country,
            state: topRatedCharities.data[i].mailingAddress.stateOrProvince
          };
          topRatedCharitiesArr.push(charity);
        }
        hndbrsObj.topRatedCharities = topRatedCharitiesArr;
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
              res.render("profiled", hndbrsObj);
            }
          });
        }
        if (dbUser.length === 0) {
          res.render("profiled", hndbrsObj);
        }
      });
    });
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

module.exports = router;
