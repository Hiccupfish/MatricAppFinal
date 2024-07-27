//initialize the database


const sqlite3 = require('sqlite3').verbose();
const { generateUsers, generateLessons, generateQuestions, generateAnswers, generateProgress, generateConnections } = require('./mockData');

const db = new sqlite3.Database(':memory:'); // Use file-based DB for production

db.serialize(() => {
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT, email TEXT, location TEXT, privacy_settings TEXT)");
  db.run("CREATE TABLE lessons (id INTEGER PRIMARY KEY, title TEXT, content TEXT)");
  db.run("CREATE TABLE questions (id INTEGER PRIMARY KEY, text TEXT, difficulty TEXT, options TEXT, correct_answer INTEGER, lesson_id INTEGER)");
  db.run("CREATE TABLE answers (id INTEGER PRIMARY KEY, user_id INTEGER, question_id INTEGER, selected_answer INTEGER, is_correct BOOLEAN)");
  db.run("CREATE TABLE progress (id INTEGER PRIMARY KEY, user_id INTEGER, lesson_id INTEGER, score INTEGER, completion_status BOOLEAN)");
  db.run("CREATE TABLE connections (id INTEGER PRIMARY KEY, user1_id INTEGER, user2_id INTEGER, status TEXT)");

  // Insert mock data
  const users = generateUsers(10);
  const lessons = generateLessons(5);
  const questions = generateQuestions(20, lessons.length);
  const answers = generateAnswers(users, questions);
  const progress = generateProgress(users, lessons);
  const connections = generateConnections(users);

  users.forEach(user => db.run("INSERT INTO users (username, password, email, location, privacy_settings) VALUES (?, ?, ?, ?, ?)", [user.username, user.password, user.email, user.location, user.privacy_settings]));
  lessons.forEach(lesson => db.run("INSERT INTO lessons (title, content) VALUES (?, ?)", [lesson.title, lesson.content]));
  questions.forEach(question => db.run("INSERT INTO questions (text, difficulty, options, correct_answer, lesson_id) VALUES (?, ?, ?, ?, ?)", [question.text, question.difficulty, JSON.stringify(question.options), question.correct_answer, question.lesson_id]));
  answers.forEach(answer => db.run("INSERT INTO answers (user_id, question_id, selected_answer, is_correct) VALUES (?, ?, ?, ?)", [answer.user_id, answer.question_id, answer.selected_answer, answer.is_correct]));
  progress.forEach(prog => db.run("INSERT INTO progress (user_id, lesson_id, score, completion_status) VALUES (?, ?, ?, ?)", [prog.user_id, prog.lesson_id, prog.score, prog.completion_status]));
  connections.forEach(connection => db.run("INSERT INTO connections (user1_id, user2_id, status) VALUES (?, ?, ?)", [connection.user1_id, connection.user2_id, connection.status]));
});

module.exports = db;
