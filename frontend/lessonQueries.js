// dont forget to add the functions to main.js

const db = require('./db');

const getLessonsBySubject = (subjectName, callback) => {
  const query = `
    SELECT Lessons.id, Lessons.title, Lessons.content 
    FROM Lessons 
    JOIN Subjects ON Lessons.subject_id = Subjects.id 
    WHERE Subjects.name = ?
  `;

  db.all(query, [subjectName], (err, rows) => {
    if (err) {
      console.error(err.message);
      callback(err);
    } else {
      callback(null, rows);
    }
  });
};

module.exports = {
  getLessonsBySubject,
};
