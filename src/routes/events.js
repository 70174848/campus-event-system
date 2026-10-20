
const express = require('express');
const db = require('../database/db');
const jwt = require('jsonwebtoken');

const router = express.Router();

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Please log in first.' });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: 'JWT_SECRET is missing.' });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
}

// GET all events
router.get('/', (req, res) => {
  try {
    const events = db.prepare(
      'SELECT * FROM events ORDER BY date ASC, time ASC'
    ).all();
    res.json({ events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Could not retrieve events.' });
  }
});

// GET one event
router.get('/:id', (req, res) => {
  const event = db.prepare('SELECT * FROM events WHERE id = ?')
    .get(Number(req.params.id));

  if (!event) {
    return res.status(404).json({ message: 'Event not found.' });
  }

  res.json({ event });
});

// CREATE event
router.post('/', authenticateToken, (req, res) => {
  try {
    const { title, description, date, time, location, capacity } = req.body;

    if (!title || !date || !location) {
      return res.status(400).json({
        message: 'Title, date, and location are required.'
      });
    }

    const result = db.prepare(`
      INSERT INTO events
      (title, description, date, time, location, capacity, created_by)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      title, description || null, date, time || null,
      location, Number(capacity || 100), req.user.id
    );

    res.status(201).json({
      message: 'Event created successfully.',
      event: db.prepare('SELECT * FROM events WHERE id = ?')
        .get(Number(result.lastInsertRowid))
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Could not create event.' });
  }
});

// UPDATE event
router.put('/:id', authenticateToken, (req, res) => {
  try {
    const id = Number(req.params.id);
    const existing = db.prepare('SELECT * FROM events WHERE id = ?').get(id);

    if (!existing) {
      return res.status(404).json({ message: 'Event not found.' });
    }

    if (Number(existing.created_by) !== Number(req.user.id)) {
      return res.status(403).json({
        message: 'You can only update events you created.'
      });
    }

    const { title, description, date, time, location, capacity } = req.body;

    db.prepare(`
      UPDATE events
      SET title = ?, description = ?, date = ?, time = ?,
          location = ?, capacity = ?
      WHERE id = ?
    `).run(
      title ?? existing.title,
      description ?? existing.description,
      date ?? existing.date,
      time ?? existing.time,
      location ?? existing.location,
      capacity === undefined ? existing.capacity : Number(capacity),
      id
    );

    res.json({
      message: 'Event updated successfully.',
      event: db.prepare('SELECT * FROM events WHERE id = ?').get(id)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Could not update event.' });
  }
});

// DELETE event
router.delete('/:id', authenticateToken, (req, res) => {
  try {
    const id = Number(req.params.id);
    const existing = db.prepare('SELECT * FROM events WHERE id = ?').get(id);

    if (!existing) {
      return res.status(404).json({ message: 'Event not found.' });
    }

    if (Number(existing.created_by) !== Number(req.user.id)) {
      return res.status(403).json({
        message: 'You can only delete events you created.'
      });
    }

    db.prepare('DELETE FROM events WHERE id = ?').run(id);
    res.json({ message: 'Event deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Could not delete event.' });
  }
});

module.exports = router;
