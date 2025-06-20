var express = require('express');
var router = express.Router();
var db = require('../db');

router.post('/login', async function (req, res, next) {
    const { username, password } = req.body;

    const [rows] = await db.execute(`SELECT Users.username
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

    if (user.role === 'owner') {
        return res.json({redirect: 'owner-dashboard.html'});
    } else if (user.role === 'walker') {
        return res.json({redirect: 'walker-dashboard.html'});
    } else {
        return res.status(400).send('Unknown role');
    }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});
module.exports = router;
