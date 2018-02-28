var express = require('express');
var db = require('../models');
var request = require('request');
var passport = require('../config/ppConfig');
var router = express.Router();
var isLoggedIn = require('../middleware/isLoggedIn');




module.exports = router;
