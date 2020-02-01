require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");
var passportSetup = require("./config/passport-setup");
var Handlebars = require("handlebars");
var HandlebarsIntl = require("handlebars-intl");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");

HandlebarsIntl.registerWith(Handlebars);

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Middleware
app.use(cookieSession({
  maxAge: 24*60*60*1000,
  keys: [keys.session.cookieKey]
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//app.use(express.static("public"));
app.use(express.static(__dirname + "/public"));
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);



// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

//create home route
app.get("/", (req, res) => {
  res.render("index", { user: req.user })
});

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
