var express = require('express');
var router = express.Router();
var db = require('../db');

router.post('/login', async function (req, res, next) {
    const { username, password } = req.body;

    try {
        const [rows] = await db.execute(`
            SELECT username, password_hash, role
            FROM Users
            WHERE username = ?`,
            [username]
        );

        if (rows.length === 0) {
            return res.sendStatus(401); // user not found
        }

        const user = rows[0];

        if (user.password_hash !== password) {
            return res.sendStatus(401); // wrong password
        }

        return res.json({
            user: {
                username: user.username,
                role: user.role
            }
        })

    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
});

module.exports = router;
