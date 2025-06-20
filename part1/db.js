const mysql= require('mysql2/promise');

const db = mysql.createPool({
    host: '127.0.0.1',
    socketPath: '/var/run/mysqld/mysqld.sock',
    user: 'root',
    password: '28122005',
    database: 'DogWalkService'
});

module.exports = db;