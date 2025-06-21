const express = require('express');
const router = express.Router();
const db = require('../models/db');


// GET all users (for admin/testing)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT user_id, username, email, role FROM Users');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// GET dogs
router.get('/getDogs', async (req, res) => {
  console.log('🔥 /getDogs route hit');
  const ownerId = req.session.user_id;
  console.log("Session owner ID:", ownerId);

  if (!req.session.user || req.session.user.role !== 'owner') {
    return res.status(401).json({error : 'Unathorised'});
  }
  try {
    const user = req.session.user_id;
    const [rows] = await db.query(
      `SELECT dog_id, name FROM Dogs WHERE owner_id = ?`,
      [user]);
      res.json(rows);
      console.log("Dogs fetched from DB:", res.json(rows));

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch dogs' });
  }
});

// POST a new user (simple signup)
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const [result] = await db.query(`
      INSERT INTO Users (username, email, password_hash, role)
      VALUES (?, ?, ?, ?)
    `, [username, email, password, role]);

    res.status(201).json({ message: 'User registered', user_id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.get('/me', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not logged in' });
  }
  res.json(req.session.user);
});

// POST login (dummy version)
router.post('/login', async (req, res) => {
  // Accept data as username and password (not email and password as login ask for username)
  const { username, password } = req.body;

  try {
    // Query if user exists
    const [rows] = await db.query(`
      SELECT user_id, username, role FROM Users
      WHERE username = ? AND password_hash = ?
    `, [username, password]);

    // If not exist return error
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Store user details
    const user = rows[0];

    // Set session cookie
    req.session.user = {
      id: user.user_id,
      username: user.username,
      role: user.role
    };

    // Otherwise return success with user
    res.json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

router.get('/logout', async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to log out' });
    }

    // Clears session cookie from browser
    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'Logged out successfully' });
  });
});
module.exports = router;
