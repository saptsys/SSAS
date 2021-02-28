const { app, BrowserWindow } = require("electron");
const path = require("path");
const glob = require("glob");
const url = require("url");
const { createConnection } = require("typeorm");
const typeOrmConf = require("./ormconfig");
const { FirmInfoService, INVALID_REASONS } = require("./electron/services/FirmInfoService");


function init() {
    if (handleSquirrelEvent(app)) {
      return;
    }
  // TODO: in produciton remove this
  try {
    require("electron-reloader")(module, {
      debug: true,
      watchRenderer: true,
      ignore: [
        "./databases",
        "./src",
        "./electron",
        "db*",
        "webpack",
        "./*.js",
        "logs",
      ],
    });
  } catch (_) {
    console.log("electron-preloader-notfound");
  }

  // load main processes only after we created database connection
  const firmInfo = new FirmInfoService()
  if (firmInfo.isValid.status === false) {
    const { reason } = firmInfo.isValid
    if (reason === INVALID_REASONS.DATA_NOT_FOUND) {
      firmInfo.createNew({
        machineIds: ["54f5sd-sdfgdshdf-sdfhg-sdf234"],
        firms: [{ id: 1, name: "ABC Photo Ltd.", default: true }],
        databases: [{ id: 1, year: '2020-21', active: true }],
        expiryDate: function () { const d = new Date(); d.setDate(d.getDate() + 1); return d }(),
        renewedDate: new Date()
      })
      console.log("\n\nnew dummy firm info created please restart")
      // app.relaunch()
    }
    console.error(`-*-*-*-*-*-*-*-*-* Exiting... Due to ${reason} *-*-*-*-*-*-*-*-*-*-\n\n`)
    app.exit()
  }
  console.log("database connecting: "+firmInfo.activeDBPath);
  setDatabaseConnection(firmInfo.activeDBPath)
    .then(() => {
      console.log("database connected ");
      loadMainProcess();
    })
    .catch((e) => {
      console.log(e);
      console.log("database connection failed");
      app.quit();
    });

  // return;
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
    mainWindow.setMenu(null);
    if (isDev()) {
      console.log("-------- DEVELOPER MODE --------");
      installExtensions();
      installIpcLogger();
      // if we are in dev mode load up 'http://localhost:8080/index.html'
      indexPath = url.format({
        protocol: "http:",
        host: "localhost:8080",
        pathname: "index.html",
        slashes: true,
        // hash: MODAL_ROUTES.firmInfoModal._path
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

const installIpcLogger = () => {
  try {
    electronIpcLog((event) => {
      var { channel, data, sent, sync } = event;
      var args = [sent ? "⬆️" : "⬇️", channel, ...data];
      if (sync) args.unshift("ipc:sync");
      else args.unshift("ipc");
      console.log(...args);
    });
  } catch (e) {
    console.log("ipc logger not loaded.");
  }
};
const installExtensions = async () => {
  const {
    default: installExtension,
    REACT_DEVELOPER_TOOLS,
    REDUX_DEVTOOLS,
  } = require("electron-devtools-installer");

  const extensions = [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS];
  for (const extension of extensions) {
    try {
      const name = await installExtension(extension);
      console.log(`Added Extension:  ${name}`);
    } catch (e) {
      console.log("An error occurred: ", err);
    }
  }
};

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
function setDatabaseConnection(dbName) {
  connectionPromise = createConnection({ ...typeOrmConf, database: dbName });
  connectionPromise.then((connection) => {
    connection
    syncTypeORM(connection);
  });
  return connectionPromise;
}

async function syncTypeORM(connection) {
  await connection.query("PRAGMA foreign_keys=OFF");
  await connection.synchronize();
  await connection.query("PRAGMA foreign_keys=ON");
}

function handleSquirrelEvent(application) {
  if (process.argv.length === 1) {
      return false;
  }

  const ChildProcess = require('child_process');
  const path = require('path');

  const appFolder = path.resolve(process.execPath, '..');
  const rootAtomFolder = path.resolve(appFolder, '..');
  const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
  const exeName = path.basename(process.execPath);

  const spawn = function(command, args) {
      let spawnedProcess, error;

      try {
          spawnedProcess = ChildProcess.spawn(command, args, {
              detached: true
          });
      } catch (error) {}

      return spawnedProcess;
  };

  const spawnUpdate = function(args) {
      return spawn(updateDotExe, args);
  };

  const squirrelEvent = process.argv[1];
  switch (squirrelEvent) {
      case '--squirrel-install':
      case '--squirrel-updated':
          // Optionally do things such as:
          // - Add your .exe to the PATH
          // - Write to the registry for things like file associations and
          //   explorer context menus

          // Install desktop and start menu shortcuts
          spawnUpdate(['--createShortcut', exeName]);

          setTimeout(application.quit, 1000);
          return true;

      case '--squirrel-uninstall':
          // Undo anything you did in the --squirrel-install and
          // --squirrel-updated handlers

          // Remove desktop and start menu shortcuts
          spawnUpdate(['--removeShortcut', exeName]);

          setTimeout(application.quit, 1000);
          return true;

      case '--squirrel-obsolete':
          // This is called on the outgoing version of your app before
          // we update to the new version - it's the opposite of
          // --squirrel-updated

          application.quit();
          return true;
  }
};

init();


/*
electron-packager . ssas --overwrite --asar=true --platform=win32 --arch=ia32 --prune=true --out=release/package --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName="ssas"
*/