const db = require('../db_connection/connection.js');
const {DateTime} = require('luxon');

function getFinishedAuctions(callback) {
    let date = DateTime.now().toFormat('yyyy-LL-dd HH:mm:ss');
    db.query(
        `SELECT * FROM auctions WHERE offers_stop < '${date}'`,
        function (err, results) {
            callback(results);
        }
    );
}

module.exports = getFinishedAuctions;
