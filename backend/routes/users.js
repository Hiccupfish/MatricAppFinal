// This JavaScript code defines routes for user registration and login in an Express.js application that uses SQLite as its database. It handles:

// User Registration: Creates a new user in the database, storing their information securely.
// User Login: Authenticates existing users by verifying their credentials.

const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db/init');
const router = express.Router();

router.post('/register', (req, res) => {
  const { username, password, email, location, privacy_settings } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  db.run("INSERT INTO users (username, password, email, location, privacy_settings) VALUES (?, ?, ?, ?, ?)", [username, hashedPassword, email, location, privacy_settings], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID });
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    res.status(200).json({ message: "Login successful" });
  });
});

module.exports = router;
