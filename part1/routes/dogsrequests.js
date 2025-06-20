var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/api/dogs', async (req, res) => {
  const[rows] = await db.query(`
    SELECT Dogs.name, Dogs.size, Users.user_id
    FROM Users
    INNER JOIN Dogs ON Users.user_id = Dogs.owner_id`)
});

module.exports = router;