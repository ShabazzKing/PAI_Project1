var express = require('express');
var router = express.Router();

const getCurrentAuctions = require('../models/auction/currentAuctions.js');
const getFinishedAuctions = require('../models/auction/finishedAuctions.js');
const getCurrentAuctionById = require('../models/auction/currentAuctionById.js');
const addAuction = require('../models/auction/addAuction.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Aplikacja do obsługi przetargów' });
});

router.get('/auctions', function(req, res) {
  getCurrentAuctions(function(data) {
    res.render('auction/currentAuctions', { title: 'Lista aktualnych przetargów', data: data });
  });
});

router.get('/auctions-finished', function(req, res) {
  getFinishedAuctions(function(data) {
    res.render('auction/finishedAuctions', { title: 'Lista zakończonych przetargów', data: data });
  });
});

router.get('/auctions/:id', function(req, res) {
  getCurrentAuctionById(req.params.id, function(data) {
    res.render('auction/currentAuctionById', { title: 'Szczegóły przetargu', data: data });
  });
});

router.get('/add-auction', function(req, res) {
  res.render('auction/addAuction', { title: 'Dodawanie przetargu' });
});

router.post('/add-auction-to-db', function(req, res) {
  addAuction(req.body, function() {
    res.redirect('/auctions');
  });
});

module.exports = router;
