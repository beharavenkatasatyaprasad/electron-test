/* eslint-disable no-dupe-keys */
const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
    },
  });


  const startUrl = !app.isPackaged ? 'http://localhost:3000' : `file://${path.join(__dirname, 'index.html')}`;

  mainWindow.loadURL(startUrl);
  mainWindow.webContents.on('before-input-event', (event, input) => {
    if ((input.control || input.meta) && input.key.toLowerCase() === 'r') {
      event.preventDefault();
    }
  });

}

app.whenReady().then(async () => {
  createWindow();
});

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
