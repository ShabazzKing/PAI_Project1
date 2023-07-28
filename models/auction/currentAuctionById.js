const db = require('../db_connection/connection.js');

function getCurrentAuctionById(auctionId, callback) {
    db.query(
        `SELECT * FROM auctions WHERE auction_id = ${auctionId}`,
        function(err, results) {
            callback(results);
        }
    );
}

module.exports = getCurrentAuctionById;
