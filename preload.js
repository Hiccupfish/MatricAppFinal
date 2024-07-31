const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
  'api', {
    getQuestions: () => ipcRenderer.invoke('get-questions'),
    insertQuestion: (question) => ipcRenderer.invoke('insert-question', question)
  }
);
