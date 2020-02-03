//add this file to .gitignore
require("dotenv").config();

module.exports = {
  google: {
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret
  },
  mysql: {
    user: "root",
    password: process.env.password
  },
  session: {
    cookieKey: "egyptiantsunami"
  }
};
