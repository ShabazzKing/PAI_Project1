var express = require('express');
var router = express.Router();

const getCurrentAuctions = require('../models/auction/currentAuctions.js');
const getFinishedAuctions = require('../models/auction/finishedAuctions.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Aplikacja do obsługi przetargów' });
});

router.get('/auctions', function(req, res) {
  getCurrentAuctions(function(data) {
    res.render('currentAuctions', { title: 'Lista aktualnych przetargów', data: data });
  });
});

router.get('/auctions-finished', function(req, res) {
  getFinishedAuctions(function(data) {
    res.render('finishedAuctions', { title: 'Lista zakończonych przetargów', data: data });
  });
});

module.exports = router;
