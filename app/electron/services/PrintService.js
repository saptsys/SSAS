const { webContents, BrowserWindow } = require("electron");
const fs = require('fs')
const path = require('path')
class PrintService {
  constructor() {
    this.prefs = {
      silent: true,
      height: 500,
      width: 100,
      theme: "DARK",
      preview: false
    }
    this.window = null;
    this.count = 0;
  }

  print(payload) {
    const path = payload.path
    const printOptions = payload.options

    let windowOptions = {
      webPreferences: {
        nodeIntegration: true,
        webSecurity: true,
        contextIsolation: false,
        preload: __dirname + "/preload.js",
      },
    }

    if(printOptions.silent){
      windowOptions.show = false
    }

    let win = new BrowserWindow(windowOptions);
    win.setParentWindow(webContents.getFocusedWebContents());
    win.loadURL(`file://${__dirname}/app.html#/${path}`);
    win.webContents.on('did-finish-load', () => {
      if(!printOptions.preview){
        win.webContents.print({
          silent: printOptions.silent
        })
      }
      if(printOptions.silent){
        setTimeout(() => {
          win.close();
        }, 5000);
      }
    })
  }
}

module.exports = PrintService;

