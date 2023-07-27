const db = require('../db_connection/connection.js');
const {DateTime} = require('luxon');

function getCurrentAuctions(callback) {
    let date = DateTime.now().toFormat('yyyy-LL-dd HH:mm:ss');
    db.query(
        `SELECT * FROM auctions WHERE offers_start < '${date}' AND offers_stop > '${date}'`,
        function (err, results) {
            callback(results);
        }
    );
}

module.exports = getCurrentAuctions;
