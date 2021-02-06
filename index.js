const { app, BrowserWindow } = require("electron");
const path = require("path");
const glob = require("glob");
const url = require("url");

const { createConnection } = require("typeorm");
const {
  default: installExtension,
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} = require("electron-devtools-installer");

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

let isDev = false;
if (process.env.NODE_ENV !== "test") {
  isDev = true;
}

const createWindow = () => {
  const windowOptions = {
    webPreferences: {
      nodeIntegration: false,
      // contextIsolation: process.env.NODE_ENV !== "test",

      webSecurity: true,
      contextIsolation: false,
      preload: __dirname + "/preload.js",
    },
    backgroundColor: "-webkit-linear-gradient(top, #3dadc2 0%,#2f4858 100%)",

    width: 1080,
    height: 840,
    resizable: false,
    show: false,

    title: app.getName(),
  };
  let mainWindow = new BrowserWindow(windowOptions);

  if (isDev) {
    console.log("-------- DEVELOPER MODE --------");

    // if we are in dev mode load up 'http://localhost:8080/index.html'
    indexPath = url.format({
      protocol: "http:",
      host: "localhost:8080",
      pathname: "index.html",
      slashes: true,
    });

    // If we are in developer mode Add React & Redux DevTools to Electon App
    installExtension(REACT_DEVELOPER_TOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log("An error occurred: ", err));

    installExtension(REDUX_DEVTOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log("An error occurred: ", err));
  } else {
    console.log("-------- PRODUCTION MODE --------");
    indexPath = url.format({
      // if we are not in dev mode load production build file
      protocol: "file:",
      pathname: path.join(__dirname, "build", "index.html"),
      slashes: true,
    });
  }
  mainWindow.loadURL(indexPath);

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
    if (isDev && process.env.NODE_ENV !== "test") {
      mainWindow.webContents.openDevTools({ mode: "detach" });
    }
  });
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
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
  setDatabaseConnection();
  const files = glob.sync(
    path.join(__dirname, "electron/main-processes/**/*.js")
  );
  files.forEach((file) => require(file));
}

async function setDatabaseConnection() {
  console.log("\n\n-------Creating DBConnection------------");
  await createConnection();
  console.log("-------DBConnection Created------------\n\n");
}
