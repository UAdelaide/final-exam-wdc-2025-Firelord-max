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
        return res.sendStatus(401);
    }

    const user = rows[0];

    if (user.password_hash !== password) {
        return res.sendStatus(401);
    }

    if (user.role == 'owner') {
        return res.json({redirect: 'owner-dashboard.html'})
    } else
});
module.exports = router;
