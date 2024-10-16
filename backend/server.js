//import required modules

const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const dbPath = path.resolve(__dirname, 'matric_prep.db');
const db = new sqlite3.Database(dbPath);



//middleware
app.use(express.json());


// Endpoint to retrieve questions from all lessons to a database 
app.get('/api/lessons', (req, res) => {
  console.log('Received request for /api/lessons'); // Debug line
  db.all('SELECT * FROM Lessons', (err, rows) => {
    if (err) {
      console.error('Error fetching lessons:', err.message);
      return res.status(500).json({ error: 'Failed to fetch questions' });
    }
    console.log('Fetched questions:', rows); // Debug line
    res.json(rows);
  });
});

app.get('/api/questions', function(req, res){
  console.log('Received request for /api/questions'); // Debug line
  db.all('SELECT * FROM Questions', (err, rows) => {
    if (err) {
      console.error('Error fetching questions:', err.message);
      return res.status(500).json({ error: 'Failed to fetch questions' });
    }
    console.log('Fetched questions:', rows); // Debug line
    res.json(rows);
  });
});


//start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
