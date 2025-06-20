var express = require('express');
var router = express.Router();
var db = require('../db');

router.post('/login', function (req, res, next) {
    const { username, password } = req.body;
})
module.exports = router;
