var express = require('express');
var router = express.Router();
var db = require('../db');

router.post('/login', function (req, res, next) {
    const { username, password } = req.body;

    if 

    const [rows_4] = await db.execute('SELECT COUNT(*) AS count FROM WalkRatings');
    if (rows_4[0].count === 0) {
      await db.execute(`
        INSERT INTO WalkRatings (request_id, walker_id, owner_id, rating, comments) VALUES
        ((SELECT request_id FROM WalkRequests WHERE request_id = 1), (SELECT user_id FROM Users WHERE username = 'bobwalker'),(SELECT user_id FROM Users WHERE username = 'alice123'), 5, 'Slow dog, but cute'),
        ((SELECT request_id FROM WalkRequests WHERE request_id = 2), (SELECT user_id FROM Users WHERE username = 'bobwalker'),(SELECT user_id FROM Users WHERE username = 'alice123'), 2, 'Silly dog, ate bunny');
      `);
      }

})
module.exports = router;
