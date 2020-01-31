const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
const db = require("../models");

passport.serializeUser(function(user,done) {
  console.log("user serialised");
  done(null, user.id);
  });

passport.deserializeUser(function (id,done) {
  console.log("user de-serialised");
  User.findById(id, function(err,user) {
    done(err, user);
  });
 });

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // check if user already exists in our own db
        db.User.findOne({googleId: profile.id}).then((currentUser) => {
            if(currentUser){
                // already have this user
                console.log('user is: ', currentUser);
                done(null, currentUser);
             } else {
                          //if not, create user in our db
                          db.User.create({
                            name: profile.displayName,
                            googleId: profile.id
                          }).then(function (newUser) {
                            console.log("new user created: " + newUser.name);
                            done(null, newUser);
                          });
            }
        });
    })
);


// passport.use(
//   new GoogleStrategy({
//     //options for the strat
//     callbackURL: "/auth/google/redirect",
//     clientID: keys.google.clientID,
//     clientSecret: keys.google.clientSecret
//   }, (accessToken, refreshToken, profile, done) => {
//     //check if user already exists in db
//     db.User.findOne({ googleId: profile.id }).then(function(currentUser){
//       if (currentUser) {
//         console.log("user is ", currentUser);
//         done(null, currentUser);
//         //already have user
//       } else {
//         //if not, create user in our db
//         db.User.create({
//           name: profile.displayName,
//           googleId: profile.id
//         }).then(function (newUser) {
//           console.log("new user created: " + newUser);
//           done(null, newUser);
//         });
//       }
//     });
//   })
// )