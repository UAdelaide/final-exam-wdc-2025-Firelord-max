var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/dogs', async (req, res) => {
  const[rows] = await db.query(`
    SELECT * FROM DOGS
    `);
  res.json(rows);
});

router.get('/walkrequests/open', async (req, res) => {
    const[rows] = await db.query(`
        SELECT WalkRequests.request_id, Dogs.name, WalkRequests.requested_time, WalkRequests.duration_minutes, WalkRequests.location, Users.username
        FROM Users
        INNER JOIN Dogs ON Users.user_id = Dogs.owner_id
        INNER JOIN WalkRequests ON Dogs.dog_id = WalkRequests.dog_id
        WHERE WalkRequests.status = 'OPEN'`);
    res.json(rows);
});

router.get('/walkers/summary', async (req, res) => {
    const[rows] = await db.query(`
        SELECT Users.username, COUNT(WalkRatings.rating_id) AS no_rating, AVG(WalkRatings.rating) AS avg_rating, COUNT(CASE WHEN WalkRequests.status = 'completed' THEN 1 END) AS complete_walks
        FROM Users
        INNER JOIN WalkRatings ON Users.user_id = WalkRatings.walker_id
        INNER JOIN WalkRequests ON WalkRatings.request_id = WalkRequests.request_id
        WHERE Users.role = 'walker'
        GROUP BY Users.username
        `);
    res.json(rows);
});

module.exports = router;
