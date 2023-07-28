const db = require('../db_connection/connection.js');

function addAuction(params, callback) {
    params.offers_start[10] = ' ';
    params.offers_start += ':00';
    params.offers_stop[10] = ' ';
    params.offers_stop += ':00';
    db.query(
        `INSERT INTO auctions (auction_title, offers_start, offers_stop, description, contracting_party, max_value) \
            VALUES ('${params.auction_title}', '${params.offers_start}', '${params.offers_stop}', \
            '${params.description}', '${params.contracting_party}', ${params.max_value})`,
        function(err, results) {
            callback();
        }
    );
}

module.exports = addAuction;
