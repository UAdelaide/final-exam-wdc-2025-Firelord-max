var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/dogs', async (req, res) => {
  const[rows] = await db.query(`
    SELECT Dogs.name, Dogs.size, Users.username
    FROM Users
    INNER JOIN Dogs ON Users.user_id = Dogs.owner_id
    `);
  res.json(rows);
});

router.get('/walkrequests/open', async (req, res) => {
    const[rows] = await db.query(`
        SELECT `);
})

module.exports = router;