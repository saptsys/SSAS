const { webContents,BrowserWindow } = require("electron");

class PrintService {
  constructor() {
    this.prefs = {
      silent: true,
      height: 500,
      width: 100,
      theme: "DARK",
      preview:false
    }
    this.window = null;
    this.count = 0;
  }
  challan(payload) {
    const window = new BrowserWindow({
      resizable:false,
      modal:true,
      show:false
    });
  }
}

module.exports = PrintService;
