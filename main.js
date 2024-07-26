const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // Remove the preload option since we don't have a preload.js file
      nodeIntegration: false, // Keep this for security
      contextIsolation: true, // Keep this for security
    },
  });

  mainWindow.loadFile('index.html');

  // Open the DevTools automatically if not in production
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }
}



app.whenReady().then(createWindow); // Ensure app is ready before creating the window

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
