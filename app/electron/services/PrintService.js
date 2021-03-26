const { webContents, BrowserWindow } = require("electron");
const fs = require('fs')
const path = require('path')
const os = require('os')
class PrintService {
  constructor() {
    this.prefs = {
      silent: true,
      theme: "DARK",
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
      title: "Print",
      // parent: webContents.getFocusedWebContents()
    }

    if (printOptions.silent) {
      windowOptions.show = false
    }

    let win = new BrowserWindow(windowOptions);
    win.setMenu(null)
    // win.webContents.openDevTools();

    win.loadURL(`file://${__dirname}/app.html#/${path}`);

    win.webContents.on('did-finish-load', async () => {

      let height = await win.webContents.executeJavaScript(`try{document.getElementById("root").getElementsByTagName("body")[0].getBoundingClientRect().height}catch(e){}`)
      let width = await win.webContents.executeJavaScript(`try{document.getElementById("root").getElementsByTagName("body")[0].getBoundingClientRect().width}catch(e){}`)

      if (height > 800) {
        height = 600
      }
      win.setSize(parseInt(width) + 20, parseInt(height), true);

      console.log("loaded...")
      console.log(printOptions)
      if (printOptions.preview) {

        win.webContents.print({
          silent: false,
          printBackground: true
        })

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
        }
      }
    })
  }
}

module.exports = PrintService;

