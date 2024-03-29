const { webContents, BrowserWindow,app } = require("electron");
const fs = require('fs')
const path = require('path')
const os = require('os')
const dialog = require('electron').dialog;
const moment = require("moment");
class PrintService {
  constructor() {
    this.prefs = {
      silent: true,
      theme: "DARK",
    }
    this.window = null;
    this.count = 0;
  }

  async print(payload) {
    const modulePath = payload.path
    const printOptions = payload.options

    let windowOptions = {
      webPreferences: {
        nodeIntegration: true,
        webSecurity: true,
        contextIsolation: false,
        preload: __dirname + "/preload.js",
      },
      title: "Print",
      show:false,
      // parent: BrowserWindow.getFocusedWindow()
    }

    if (printOptions.silent) {
      windowOptions.show = false
    }

    let win = new BrowserWindow(windowOptions);
    win.setMenu(null)
    // if(!app.isPackaged){
    //   win.webContents.openDevTools();

    // }

    win.loadURL(`file://${__dirname}/app.html#/${modulePath}`);

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
        win.show()
        win.webContents.print({
          silent: false,
          printBackground: true
        })

      } else if (printOptions.pdf) {

        // not working
        // win.hide()

        // Use default printing options
        let pdfPath = await dialog.showOpenDialog({properties: ['openDirectory']});

        console.log(pdfPath)

        if(pdfPath.canceled){
          return;
        }
        pdfPath = pdfPath.filePaths[0];
        pdfPath = path.join(pdfPath, `${moment().format("DDMMYY-hms")}.pdf`)

        win.webContents.printToPDF({printBackground:true}).then( (data) => {
          fs.writeFile(pdfPath, data, (error) => {
            if (error) throw error
            console.log(`Wrote PDF successfully to ${pdfPath}`)
          })
        }).catch(error => {
          console.log(`Failed to write PDF to ${pdfPath}: `, error)
        }).finally(() =>{
          win.close();
        })

      }  else {
        if (printOptions.silent) {
          setTimeout(() => {
            win.close();
          }, 10000);
          win.webContents.print({
            silent: true,
            printBackground: true
          })
        }else{
          win.show()
        }
      }
    })
  }
}

module.exports = PrintService;

