require('dotenv').config();
var flash = require('connect-flash');
var express = require('express');
var request = require('request');
var db = require('./models');
var path = require('path');
var async = require('async');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('./config/ppConfig');
var isLoggedIn = require('./middleware/isLoggedIn');

var app = express();

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  // Before EVERY route, attach the flash messages and current user to res.locals
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/profile', isLoggedIn, function(req, res) {
  db.user.findOne({
    where: { email: req.user.email }
  }).then(function(address) {
    var url = 'https://www.googleapis.com/civicinfo/v2/representatives?key='
      + process.env.GOOGLE_KEY + '&address=' + address.dataValues.address + '%20' +
      address.dataValues.city + '%20' + address.dataValues.state + '&';

    request(url, function(error, response, body) {
      var reps = JSON.parse(body);
      var options = {
        url: 'https://api.propublica.org/congress/v1/bills/upcoming/house',
        headers: {
          'X-API-Key': process.env.CONGRESS_KEY
        }
      };
      request(options, function(error, response, body) {
        var bills = JSON.parse(body);
        // res.render('profile', { reps: reps, bills: bills.results });
        res.send(bills);
      });
    });
  });
});


app.use('/auth', require('./controllers/auth'));
app.use('/test', require('./controllers/test')); // Test Controller for API

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
