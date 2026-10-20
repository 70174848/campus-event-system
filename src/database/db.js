
const Database = require('better-sqlite3');
const path = require('path');

// Store the database file in the project folder
const db = new Database(
  path.join(__dirname, '../../campus.db')
);

// Enable foreign key relationships
db.pragma('foreign_keys = ON');

// Create the database tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    date TEXT NOT NULL,
    time TEXT,
    location TEXT NOT NULL,
    capacity INTEGER DEFAULT 100,
    created_by INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id)
      ON DELETE SET NULL
  );

  CREATE TABLE IF NOT EXISTS registrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    event_id INTEGER NOT NULL,
    registered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, event_id),
    FOREIGN KEY (user_id) REFERENCES users(id)
      ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(id)
      ON DELETE CASCADE
  );
`);

console.log('Database connected and tables are ready.');

module.exports = db;
