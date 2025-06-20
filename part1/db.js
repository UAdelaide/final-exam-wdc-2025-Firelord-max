const mysql= require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '28122005',
    database: 'book_store'
});

module.exports = db;