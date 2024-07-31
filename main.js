const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Define the path to the database file
const dbPath = path.resolve(__dirname, 'matric_prep.db');
const db = new sqlite3.Database(dbPath);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile('frontend/index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// IPC handlers for database interactions
ipcMain.handle('get-questions', (event) => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM Questions', [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
});

ipcMain.handle('insert-question', (event, question) => {
  const { lesson_id, question_text, options, correct_answer, difficulty, chapter } = question;
  return new Promise((resolve, reject) => {
    db.run(`INSERT INTO Questions (lesson_id, question_text, options, correct_answer, difficulty, chapter) VALUES (?, ?, ?, ?, ?, ?)`, [lesson_id, question_text, options, correct_answer, difficulty, chapter], function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID });
      }
    });
  });
});
