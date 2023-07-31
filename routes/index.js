var express = require('express');
var router = express.Router();

const {DateTime} = require('luxon');

const getCurrentAuctions = require('../models/auction/currentAuctions.js');
const getFinishedAuctions = require('../models/auction/finishedAuctions.js');
const getCurrentAuctionById = require('../models/auction/currentAuctionById.js');
const addAuction = require('../models/auction/addAuction.js');
const addOffer = require('../models/offer/addOffer.js');
const auctionActive = require('../models/auction/auctionActive.js');
const getOffersForFinishedAuction = require('../models/offer/offersForFinishedAuction.js');

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

router.get('/auctions-finished/:id', function(req, res) {
  auctionActive(req.params.id, function(result) {
    let date = DateTime.now();
    if (date > DateTime.fromJSDate(result[0].offers_stop)) {
      getOffersForFinishedAuction(req.params.id, function(data) {
        res.render('auction/finishedAuctionById', { title: 'Lista ofert', data: data });
      });
    } else {
      res.render('auction/auctionStillActive');
    }
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

router.get('/auctions/:id/add-offer', function(req, res) {
  auctionActive(req.params.id, function(result) {
    let date = DateTime.now();
    if (date > DateTime.fromJSDate(result[0].offers_start) && date < DateTime.fromJSDate(result[0].offers_stop)) {
      res.render('offer/addOffer', { title: 'Dodawanie oferty do przetargu', auctionId: req.params.id });
    } else {
      res.render('offer/noOfferAdding');
    }
  });
});

router.post('/add-offer-to-db/:id', function(req, res) {
  addOffer(req.body, function() {
    res.redirect('/auctions/' + req.params.id);
  });
});

module.exports = router;
