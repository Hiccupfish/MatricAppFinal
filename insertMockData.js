const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Define the path to the database file
const dbPath = path.resolve(__dirname, 'matric_prep.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`INSERT INTO Chapters (title, description) VALUES ('Algebra', 'Introduction to Algebra')`);
  db.run(`INSERT INTO Chapters (title, description) VALUES ('Geometry', 'Fundamentals of Geometry')`);

  db.run(`INSERT INTO Lessons (title, content) VALUES ('Basic Algebra', 'Basic concepts of Algebra')`);
  db.run(`INSERT INTO Lessons (title, content) VALUES ('Geometry Basics', 'Introduction to geometric shapes and theorems')`);

  db.run(`INSERT INTO Questions (lesson_id, chapter_id, question_text, options, correct_answer, difficulty, tags, explanation, question_type) 
    VALUES (1, 1, 'What is 2 + 2?', 'A) 3, B) 4, C) 5, D) 6', 'B) 4', 'easy', 'addition, basic', 'Simple addition of two numbers.', 'multiple-choice')`);

  db.run(`INSERT INTO Questions (lesson_id, chapter_id, question_text, options, correct_answer, difficulty, tags, explanation, question_type) 
    VALUES (2, 2, 'What is the sum of angles in a triangle?', 'A) 180 degrees, B) 90 degrees, C) 360 degrees, D) 270 degrees', 'A) 180 degrees', 'medium', 'angles, triangle', 'The sum of the internal angles in a triangle is always 180 degrees.', 'multiple-choice')`);

  console.log('Mock data inserted.');
});

db.close();
