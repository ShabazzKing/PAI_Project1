const db = require('../db_connection/connection.js');

function addOffer(params, callback) {
    db.query(
        `INSERT INTO offers (auction_id, contractor, offer_value) \
            VALUES (${params.auction_id}, '${params.contractor}', ${params.offer_value})`,
        function(err, results) {
            callback();
        }
    );
}

module.exports = addOffer;
