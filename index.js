const { app, BrowserWindow } = require("electron");
const path = require("path");
const glob = require("glob");
const url = require("url");
const { createConnection } = require("typeorm");
const reloader = require("electron-reloader");
// if (require("electron-squirrel-startup")) {
//   app.quit();
// }

function init() {
  // TODO: in produciton remove this
  try {
    reloader(module, {
      debug: true,
      watchRenderer: true,
      ignore:["./databases" ,"./src"]
    });
  } catch (_) {
    console.log("electron-preloader-notfound");
  }

  // load main processes only after we created database connection
  setDatabaseConnection()
    .then(() => {
      loadMainProcess();
    })
    .catch(() => {
      console.log("database connection failed");
      app.quit();
    });

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
      // resizable: false,
      show: false,

      title: app.getName(),
    };
    let mainWindow = new BrowserWindow(windowOptions);
    mainWindow.setMenu(null)
    if (isDev()) {
      console.log("-------- DEVELOPER MODE --------");
      installExtensions();
      // if we are in dev mode load up 'http://localhost:8080/index.html'
      indexPath = url.format({
        protocol: "http:",
        host: "localhost:8080",
        pathname: "index.html",
        slashes: true,
      });

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
      mainWindow.maximize();
      // if (isDev()) {
      mainWindow.webContents.openDevTools({ mode: "detach" });
      // }
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
}
const installExtensions = async () => {
  const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer');

  const extensions = [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS];
  for (const extension of extensions) {
    try {
      const name = await installExtension(extension);
      console.log(`Added Extension:  ${name}`);
    } catch (e) {
      console.log('An error occurred: ', err);
    }
  }
}


function isDev() {
  return process.env.NODE_ENV !== "production";
}

function loadMainProcess() {
  const files = glob.sync(
    path.join(__dirname, "electron/main-processes/**/*.js")
  );
  files.forEach((file) => require(file));
}
/**
 * @returns Promise<Connection>
 */
function setDatabaseConnection() {
  return createConnection();
}

init();
