const { webContents, BrowserWindow } = require("electron");
const fs = require('fs')
const path = require('path')
const os = require('os')

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

    webContents.getAllWebContents().forEach(x => console.log(x.id, x.getTitle(), x.getURL() + "---------------------------------\n\n"))

    let windowOptions = {
      webPreferences: {
        nodeIntegration: true,
        webSecurity: true,
        contextIsolation: false,
        preload: __dirname + "/preload.js",
        // parent: webContents.getFocusedWebContents()
        parent: webContents.fromId(2)

      },
    }

    if (printOptions.silent) {
      windowOptions.show = false
    }

    let win = new BrowserWindow(windowOptions);
    win.setMenu(null)
    win.webContents.openDevTools();

    win.loadURL(`file://${__dirname}/app.html#/${path}`);
    win.webContents.on('did-finish-load', () => {
      console.log("loaded...")
      console.log(printOptions)
      if (printOptions.preview) {

      } else if (printOptions.pdf) {

        //not working
        // win.hide()

        // Use default printing options
        // win.webContents.printToPDF({}).then(data => {
        //   const pdfPath = path.join(os.homedir(), 'Desktop', 'temp.pdf')
        //   fs.writeFile(pdfPath, data, (error) => {
        //     if (error) throw error
        //     console.log(`Wrote PDF successfully to ${pdfPath}`)
        //   })
        // }).catch(error => {
        //   console.log(`Failed to write PDF to ${pdfPath}: `, error)
        // }).finally(() =>{
        //   win.close();
        // })

      }
      else {
        if (printOptions.silent) {
          win.hide()
          setTimeout(() => {
            win.close();
          }, 5000);
          win.webContents.print({
            silent: true,
            printBackground: true
          })
        } else {
          win.webContents.print({
            silent: false,
            printBackground: true
          })
        }
      }
    })
  }
}

module.exports = PrintService;

