var express = require('express');
var router = express.Router();
var db = require('../db');

router.post('/login', function (req, res, next) {
    const { username, password } = req.body;

    const [rows] = db.execute(`SELECT Users.username
        FROM Users
        WHERE Users.username = ?`,
        [username]);

    if (rows) {
        res.sendStatus(401);
    }

    password = db.execute(`SELECT Users.password_hash
        FROM Users
        WHERE Users.password_hash = ?
        `, [password]);

    if (!password) {
        res.sendStatus(401);
    }
    res.json(`owner-dashboard.html`);
}
})
module.exports = router;
