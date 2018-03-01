var express = require('express');
var db = require('../models');
var passport = require('../config/ppConfig');
var request = require('request');
var isLoggedIn = require('../middleware/isLoggedIn');
var router = express.Router();


router.get('/', isLoggedIn, function(req, res) {
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
        var billsHouse = JSON.parse(body);
        var options2 = {
          url: 'https://api.propublica.org/congress/v1/bills/upcoming/senate',
          headers: {
            'X-API-Key': process.env.CONGRESS_KEY
          }
        };
        request(options2, function(error, response, body) {
          var billsSen = JSON.parse(body);
          res.render('profile/profile', {
            reps: reps,
            billsHouse: billsHouse.results[0].bills,
            billsSen: billsSen.results[0].bills
          });
        });
      });
    });
  });
});

// router.post('/ballot/yes', isLoggedIn, function(req, res) {
// // if (this bill is for the senate) {
//   db.ballot.create({
//     title: ,
//     url: ,
//     vote: ,
//     sen1: ,
//     sen2: ,
//     rep: null,
//     userId:
//   }).then(function(vote) {
//     res.redirect('/profile/ballot');
//   }).catch(function(error) {
//     console.log(error);
//     res.render('/');
//   });
// // } else {
// // if (this bill is for the house) {
//   db.ballot.create({
//     title: ,
//     url: ,
//     vote: ,
//   })
// }
// }
// });

module.exports = router;
