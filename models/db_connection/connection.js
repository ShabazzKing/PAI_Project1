const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'pai_operator',
    password: '123456',
    database: 'pai1'
});

module.exports = db;
