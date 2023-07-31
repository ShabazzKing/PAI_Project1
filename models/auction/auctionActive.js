const db = require('../db_connection/connection.js');

function auctionActive(auctionId, callback) {
    db.query(
        `SELECT offers_start, offers_stop FROM auctions WHERE auction_id = ${auctionId}`,
        function(err, results) {
            callback(results);
        }
    );
}

module.exports = auctionActive;
