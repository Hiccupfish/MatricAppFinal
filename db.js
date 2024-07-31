const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Define the path to the database file
const dbPath = path.resolve(__dirname, 'backend', 'matric_prep.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  // Drop all existing tables
  db.run("DROP TABLE IF EXISTS Users");
  db.run("DROP TABLE IF EXISTS Lessons");
  db.run("DROP TABLE IF EXISTS Chapters");
  db.run("DROP TABLE IF EXISTS Questions");
  db.run("DROP TABLE IF EXISTS Answers");
  db.run("DROP TABLE IF EXISTS Progress");
  db.run("DROP TABLE IF EXISTS Connections");

  // Create tables
  db.run(`CREATE TABLE IF NOT EXISTS Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT,
    location TEXT,
    privacy_settings TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS Lessons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS Chapters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS Questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lesson_id INTEGER,
    chapter_id INTEGER,
    question_text TEXT NOT NULL,
    options TEXT NOT NULL,
    correct_answer TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    tags TEXT,
    explanation TEXT,
    question_type TEXT,
    FOREIGN KEY (lesson_id) REFERENCES Lessons(id),
    FOREIGN KEY (chapter_id) REFERENCES Chapters(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS Answers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question_id INTEGER,
    user_id INTEGER,
    user_answer TEXT NOT NULL,
    is_correct BOOLEAN,
    FOREIGN KEY (question_id) REFERENCES Questions(id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS Progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    lesson_id INTEGER,
    completed BOOLEAN,
    score INTEGER,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (lesson_id) REFERENCES Lessons(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS Connections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    friend_id INTEGER,
    status TEXT,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (friend_id) REFERENCES Users(id)
  )`);
});

module.exports = db;
