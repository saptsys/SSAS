const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const glob = require("glob");
const { createConnection } = require("typeorm");
const PartyMasterService = require('./electron/services/PartyMasterSevice')



if (require("electron-squirrel-startup")) {
  app.quit();
}

try {
  require("electron-reloader")(module, {
    debug: true,
    watchRenderer: true,
  });
} catch (_) {
  console.log("electron-preloader-notfound");
}
loadMainProcess();
const createWindow = () => {
  const windowOptions = {
    webPreferences: {
      nodeIntegration: false,
      // contextIsolation: process.env.NODE_ENV !== "test",

      webSecurity: true,
      contextIsolation: true,
      preload: __dirname + "/preload.js",
    },
    backgroundColor: "-webkit-linear-gradient(top, #3dadc2 0%,#2f4858 100%)",

    width: 1080,
    height: 840,
    resizable: false,
    show: false,

    title: app.getName(),
  };
  // const mainWindow = new BrowserWindow(windowOptions);

  // mainWindow.loadFile(path.join(__dirname, "src", "index.html"));
  // mainWindow.once("ready-to-show", () => {
  //   mainWindow.show();
  //   // Open the DevTools automatically if developing
  //   if (process.env.NODE_ENV !== "test") {
  //     mainWindow.webContents.openDevTools();
  //   }
  // });

  createConnection().then(conn => {
    const serv = new PartyMasterService(conn)
    serv.saveParty({
      name: "VB ACD",
      type: "BOTH",
      stateCode: 24
    }).then(console.log).catch(console.log)

  }).catch(e => console.log("\n\nConnection Error ===> ", e, "\n\n"))


};

app.on("ready", () => {
  createWindow();
});



app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

function loadMainProcess() {
  const files = glob.sync(path.join(__dirname, 'electron/main-processes/**/*.js'));
  files.forEach((file) => require(file));
}


