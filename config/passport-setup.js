var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20");
var keys = require("./keys");
var db = require("../models");

passport.serializeUser(function(user, done) {
  console.log("(passport-setup: 7) User serialised: " + user.name + " User id: " + user.id);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log("passport-setup(12): user de-serialised");
console.log("passport-setup(13): " + id)
  db.User.findOne({ where:
    { id: id }
  }).then(function(user) {
    console.log("passport-setup(17): " + JSON.stringify(user));
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      // options for google strategy
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: "/auth/google/redirect"
    },
    function(accessToken, refreshToken, profile, done) {
      console.log("passport-setup (31)");
      console.log(profile.displayName);
      console.log(profile.id);
      process.nextTick(function() {
      // check if user already exists in our own db
      db.User.findOne({ googleId: profile.id }).then(function(currentUser) {
        if (currentUser) {
          // already have this user
          console.log("(passport-setup: 31) User is: ", currentUser.dataValues.name);
          return done(null, currentUser);
        } else {
          //if not, create user in our db
          db.User.create({
            name: profile.displayName,
            googleId: profile.id
          }).then(function(newUser) {
            console.log("passport-setup(47): new user created: " + newUser.name);
            return done(null, newUser);
          });
        }
      });
  
    });
    }
    
  )
);
