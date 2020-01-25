var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var session = require("express-session");
var passport = require("passport");
var Auth0Strategy = require("passport-auth0");
var myVars = {
  domain: "dev-jdtgnlxo.auth0.com",
  clientID: "e55AlXrGc5VLLypILM8TS0oQtQvDDYnU",
  clientSecret:
    "oPuyyZFGu5hcKQWScRWvuxZKrJH4hfnbnNU5Uw_dbsHnzLtnd3GHK5LuxVO-YX0S",
  callbackURL: "http://localhost:3000/callback"
};

var strategy = new Auth0Strategy(
  {
    domain: "dev-jdtgnlxo.auth0.com",
    clientID: "e55AlXrGc5VLLypILM8TS0oQtQvDDYnU",
    clientSecret:
      "oPuyyZFGu5hcKQWScRWvuxZKrJH4hfnbnNU5Uw_dbsHnzLtnd3GHK5LuxVO-YX0S",
    callbackURL: "http://localhost:3000/callback"
  },
  function(accessToken, refreshToken, extraParam, profile, done) {
    return done(null, profile);
  }
);

passport.use(strategy);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

var app = express();
app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: "your_secret_key",
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.locals.loggedIn = false;

  if (
    req.session.passport &&
    typeof req.session.passport.user !== "undefined"
  ) {
    res.locals.loggedIn = true;
  }

  next();
});

//deleted next
app.get("/", function(req, res) {
  res.render("index");
});

app.get(
  "/login",
  passport.authenticate("auth0", {
    clientID: myVars.clientID,
    domain: myVars.domain,
    redirectUri: myVars.callbackURL,
    responseType: "code",
    audience: "https://dev-jdtgnlxo.auth0.com/userinfo/userinfo",
    scope: "openid profile"
  }),
  function(req, res) {
    res.redirect("/");
  }
);

app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

app.get(
  "/callback",
  passport.authenticate("auth0", {
    failureRedirect: "/failure"
  }),
  function(req, res) {
    res.redirect("/user");
  }
);

//deleted next
app.get("/user", function(req, res) {
  res.render("user", {
    user: req.user
  });
});

//deleted next
app.get("/failure", function(req, res) {
  res.render("failure");
});

app.listen(3000, function() {
  console.log("your server is running on port 3000");
});
