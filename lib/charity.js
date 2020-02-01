/* eslint-disable camelcase */
var axios = require("axios");

var charityNavURL = axios.create({
  baseURL: "https://api.data.charitynavigator.org/v2/Organizations"
});

charityNavURL.defaults.headers.common.app_id = process.env.APP_ID;
charityNavURL.defaults.headers.common.app_key = process.env.APP_KEY;

module.exports = charityNavURL;
