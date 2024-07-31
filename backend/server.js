const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const dbPath = path.resolve(__dirname, 'matric_prep.db');
const db = new sqlite3.Database(dbPath);

app.use(express.json());

app.get('/api/questions', (req, res) => {
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
;

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
