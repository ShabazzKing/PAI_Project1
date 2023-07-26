const db = require('../db_connection/connection.js');
const DateTime = require('luxon');

function getCurrentAuctions() {
    let result;
    let date = DateTime.now().toFormat('y-LL-dd HH:mm:ss');
    db.query(
        `SELECT * FROM auctions WHERE offers_start < ${date} AND offers_stop > ${date}`,
        function (err, results) {
            result = results;
        }
    );
    return result;
}

module.exports = getCurrentAuctions;
