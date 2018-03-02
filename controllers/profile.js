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

router.post('/', isLoggedIn, function(req, res) {
  db.ballot.findOrCreate({
    where: { url: req.body.url },
    defaults: {
      title: req.body.title,
      url: req.body.url,
      vote: req.body.vote,
      sen1: req.body.sen1,
      sen1phone: req.body.sen1phone,
      sen2: req.body.sen2,
      sen2phone: req.body.sen2phone,
      rep: req.body.rep,
      repphone: req.body.repphone,
      userId: req.user.id
    }
  }).spread(function(ballot, wasCreated) {
    res.redirect('/profile/ballots');
  })
  .catch(function(error) {
    console.log(error);
    res.redirect('/');
  });
});

router.get('/ballots', isLoggedIn, function(req, res) {
  db.ballot.findAll({
    where: { userId: req.user.id },
    include: [db.user]
  }).then(function(ballot) {
    res.render('profile/ballots', { ballot: ballot });
  });
});

router.put('/ballots/:id', function(req, res) {
  db.ballot.update(
    { vote: req.body.name },
    { where: { id: req.params.id }}
  ).then(function(ballot) {
    res.send('success');
  })
})

module.exports = router;
