
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database/db');

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is missing from your .env file');
}

// Register a new user
router.post('/register', (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      !name.trim() ||
      !email.trim() ||
      password.length < 8
    ) {
      return res.status(400).json({
        message: 'Name and email are required. Password must be at least 8 characters.'
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = db.prepare(
      'SELECT id FROM users WHERE email = ?'
    ).get(normalizedEmail);

    if (existingUser) {
      return res.status(409).json({
        message: 'An account with this email already exists.'
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 12);

    const result = db.prepare(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)'
    ).run(name.trim(), normalizedEmail, hashedPassword);

    return res.status(201).json({
      message: 'User registered successfully.',
      user: {
        id: Number(result.lastInsertRowid),
        name: name.trim(),
        email: normalizedEmail
      }
    });
  } catch (error) {
    console.error('Registration error:', error.message);
    return res.status(500).json({
      message: 'Registration failed.'
    });
  }
});

// Log in an existing user
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: 'Email and password are required.'
      });
    }

    const user = db.prepare(
      'SELECT id, name, email, password FROM users WHERE email = ?'
    ).get(email.trim().toLowerCase());

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({
        message: 'Invalid email or password.'
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    return res.json({
      message: 'Login successful.',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error.message);
    return res.status(500).json({
      message: 'Login failed.'
    });
  }
});

module.exports = router;
