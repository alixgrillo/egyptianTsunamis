const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
const User = require("../models/user");

passport.use(
    new GoogleStrategy({
    //options for the strat
    callbackURL: "/auth/google/redirect",
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
}, (accessToken, refreshToken, profile, done) => {
//passport callback function
console.log( profile);
var User = {
    username: profile.displayName,
    googleId: profile.id
}
console.log("New User:")
console.log(User)
// .save().then((newUser) =>{
//     console.log("new user created: " + newUser)
// })
})
)
