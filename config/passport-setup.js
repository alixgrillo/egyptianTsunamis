var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20");
var keys = require("./keys");
var User = require("../models/user");

passport.use(
  new GoogleStrategy(
    {
      //options for the strat
      callbackURL: "/auth/google/redirect",
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret
    },
    function(accessToken, refreshToken, profile, done) {
      //check to see if user already exists in our db 13-14
      // User.findOne({googleId: profile.id}).then((currentUser) => {
      // if(currentUser){
      //     //already have user
      //     console.log("user is: ", currentUser);
      // } else {
      //     //not a current user, create user
      // }
      // })

      var User = {
        username: profile.displayName,
        googleId: profile.id
      };
      console.log("New User:");
      console.log(User);
      // did thid to fix prettier problems - consider removing this optional parameter
      done.end();
      // .save().then((newUser) =>{
      //     console.log("new user created: " + newUser)
      // })
    }
  )
);
