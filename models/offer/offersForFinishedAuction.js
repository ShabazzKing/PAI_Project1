const db = require('../db_connection/connection.js');

function getOffersForFinishedAuction(auctionId, callback) {
    db.query(
        `SELECT * FROM offers
            WHERE auction_id = ${auctionId} AND offer_value <= (SELECT max_value FROM auctions WHERE auction_id = ${auctionId})
            ORDER BY offer_value`,
        function(err, results) {
            callback(results);
        }
    );
}

module.exports = getOffersForFinishedAuction;
