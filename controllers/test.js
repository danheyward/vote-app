var express = require('express');
var db = require('../models');
var request = require('request');
var passport = require('../config/ppConfig');
var router = express.Router();
var isLoggedIn = require('../middleware/isLoggedIn');


router.get('/', function(req, res) {
    var civicUrl = 'https://www.googleapis.com/civicinfo/v2/representatives?key=' + process.env.GOOGLE_KEY + '&address=1616+E+Yesler+Way+Seattle+WA&';

    request(civicUrl, function(error, response, body) {
    var reps = JSON.parse(body);
    res.render('index', { reps: reps });
  });
});


module.exports = router;
