const { app, BrowserWindow } = require("electron");
const path = require("path");
const glob = require("glob");
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
      preload: __dirname + "/preload.js",
    },
    width: 1080,
    height: 840,
    resizable: false,
    title: app.getName(),
  };
  const mainWindow = new BrowserWindow(windowOptions);

  mainWindow.loadFile(path.join(__dirname, "../src", "index.html"));
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

// Import all the IPC sender from Main Process
function loadMainProcess() {
  const files = glob.sync(path.join(__dirname, 'services/**/*.js'));
  files.forEach((file) => require(file));
}
