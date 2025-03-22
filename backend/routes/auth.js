// routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const bcrypt = require('bcrypt');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// --- Register Endpoint ---
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Creating a new user. The password will be hashed by the beforeCreate hook.
    const newUser = await User.create({ username, email, password });
    const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: '1h' });
    return res.status(201).json({ message: "User registered successfully", access_token: token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// --- Login Endpoint ---
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user && await user.checkPassword(password)) {
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).json({ access_token: token });
    }
    return res.status(401).json({ message: "Invalid credentials" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// --- JWT Middleware ---
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    // Expect header format: "Bearer <token>"
    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user; // user contains { id: ... }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// --- Protected Route ---
router.get('/protected', authenticateJWT, (req, res) => {
  res.status(200).json({ message: `Welcome User ${req.user.id}` });
});

module.exports = { authRouter: router, authenticateJWT };
