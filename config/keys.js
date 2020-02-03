//add this file to .gitignore

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
