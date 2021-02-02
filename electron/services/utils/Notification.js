const {ipcMain , Notification} = require('electron');

ipcMain.on('fire', (event,data) => {
  new Notification({
    title:data.title,
    body:data.body,
  }).show()
});