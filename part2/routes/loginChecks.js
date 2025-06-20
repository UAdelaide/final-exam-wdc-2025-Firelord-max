var express = require('express');
var router = express.Router();
var db = require('../db');

router.post('/login', function (req, res, next) {
    const { username, password } = req.body;

    const [rows] = db.execute(`SELECT Users.username
        FROM Users
        WHERE Users.username = ?`,
        [username]);

    if (rows.length === 0) {
        res.sendStatus(401);
    }

    const user = rows[0];

    if (user.password_hash !== password) {
        return res.send
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
