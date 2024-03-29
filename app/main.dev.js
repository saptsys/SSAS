/**
 * @flow
 */
import {
  app,
  BrowserWindow,
  Tray, Menu, dialog
} from 'electron';
import {
  autoUpdater
} from 'electron-updater';
import log from 'electron-log';
import {
  createConnection
} from "typeorm";
import typeOrmConf from "./ormconfig";
import {
  FirmInfoService,
} from "./electron/services/FirmInfoService";
import { INVALID_REASONS } from "./Constants/SoftwareInvalidReasons";
import { glob } from "glob";
import path from 'path'
import initDB from "./InitDB"
import fs from "fs";
import promiseIpc from "electron-promise-ipc";
import SettingsMasterService from "./electron/services/SettingsMasterService";

const appData = app.getPath("appData") + "/ssas/"


function init() {
  if (handleStartupEvent()) {
    return;
  }
  registerAppEventListeners();

  /**
   * @type {BrowserWindow}
   */
  let mainWindow = null;

  const gotTheLock = app.requestSingleInstanceLock()
  if (!gotTheLock) {
    app.isQuiting = true
    app.quit()
    sout("gotthelock")
    return
  }
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })

  const firmInfo = new FirmInfoService(true)
  const isValid = firmInfo.isValid.status;
  sout("firm info is " + isValid ? "valid" : "not valid")
  if (isValid === false) {
    const {
      reason
    } = firmInfo.isValid
    console.log("\n\n-----------------------------")
    console.log("INFO INFO INVALID REASON: " + reason)
    console.log("-----------------------------\n\n")
    if (reason === INVALID_REASONS.DATA_NOT_FOUND) {
      app.on('ready', async () => {
        firmInfo.openNewDialog()
      })

    } else {
      app.on('ready', async () => {
        firmInfo.openInvalidSoftwareDialog(reason)
      })
    }
    return;
  }

  sout("database connecting: " + firmInfo.activeDBPath);
  setDatabaseConnection(firmInfo.activeDBPath)
    .then(async (connection) => {
      sout("database connected ");
      sout("database synchronizing... ");
      await connection.query('PRAGMA foreign_keys=OFF');
      await connection.synchronize();
      await connection.query('PRAGMA foreign_keys=ON');
      sout("database synchronized... ");
      if (!firmInfo.getActiveDB().initialized) {
        try {
          if (await initDB(connection)) {
            firmInfo.setInit(true)
          }
        } catch (e) {
          console.error(e)
        }
      }
      loadMainProcess();
    })
    .catch((e) => {
      console.log(e)
      sout("database connection failed");
      app.isQuiting = true
      app.quit();
    });
  // return;


  if (process.env.NODE_ENV === 'production') {
    const sourceMapSupport = require('source-map-support');
    sourceMapSupport.install();
  }

  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    require('electron-debug')();
  }

  const installExtensions = async () => {
    const installer = require('electron-devtools-installer');
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

    return Promise.all(
      extensions.map(name => installer.default(installer[name], forceDownload))
    ).catch(console.log);
  };

  /**
   * Add event listeners...
   */

  app.on('window-all-closed', () => {
    // Respect the OSX convention of having the application in memory even
    // after all windows have been closed
    if (process.platform !== 'darwin') {
      app.isQuiting = true
      app.quit();
    }
  });

  app.on('ready', async () => {
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
    ) {
      await installExtensions();
    }

    var iconpath = path.join(__dirname, '../resources/icon256.ico') // path of y

    const windowOptions = {
      webPreferences: {
        nodeIntegration: true,
        webSecurity: true,
        contextIsolation: false,
        preload: __dirname + "/preload.js",
        icon: iconpath
      },
      backgroundColor: "-webkit-linear-gradient(top, #3dadc2 0%,#2f4858 100%)",

      width: 1080,
      height: 840,
      // resizable: false,
      show: false,

      title: app.getName(),
      icon: iconpath
    };

    mainWindow = new BrowserWindow(windowOptions);
    mainWindow.setMenu(null)
    mainWindow.loadURL(`file://${__dirname}/app.html`);
    sout("app.isPackaged = " + app.isPackaged)
    if (!app.isPackaged) {
      // mainWindow.webContents.openDevTools({ mode: "detach" });
    }

    // var appIcon = new Tray()

    // appIcon.on("click", function () {
    //   mainWindow.show()
    // })

    // var contextMenu = Menu.buildFromTemplate([
    //   {
    //     label: 'Open SSAS', click: function () {
    //       mainWindow.show()
    //       mainWindow.maximize()
    //     }
    //   },
    //   {
    //     label: 'Quit', click: function () {
    //       app.isQuiting = true
    //       app.quit()
    //     }
    //   }
    // ])

    // appIcon.setContextMenu(contextMenu)

    // @TODO: Use 'ready-to-show' event
    //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event

    mainWindow.webContents.on('did-finish-load', () => {
      if (!mainWindow) {
        throw new Error('"mainWindow" is not defined');
      }
      if (process.env.START_MINIMIZED) {
        mainWindow.minimize();
      } else {
        mainWindow.maximize();
        mainWindow.show();
        mainWindow.focus();
      }
    });

    app.on('before-quit', async function (event) {
      // takeDatabaseBackup();
      event.preventDefault();
      await takeDatabaseBackup();
      app.exit();
    })

    mainWindow.on('close', function (event) {
      // if (!app.isQuiting) {
      //   event.preventDefault()
      //   mainWindow.hide()
      // }

    })

    // mainWindow.on('show', function () {
    //   appIcon.setHighlightMode('always')
    // })

    mainWindow.on('closed', () => {
      mainWindow = null;
    });

    // Remove this if your app does not use auto updates
    // eslint-disable-next-line
    appUpdater();
  });

}

async function takeDatabaseBackup() {
  try {
    const firm = new FirmInfoService();
    const setting = new SettingsMasterService();
    let destFile = new Date().toLocaleDateString().split("/").join("-") + "-ssas.bak"
    let backupLocation = await setting.getSettingValue("BACKUP_LOCATION")
    let dest = appData + `backups/daily/`

    console.log("_ _" + backupLocation + "_ _")
    if (backupLocation) {
      dest = backupLocation + "/"
    }
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }


    if (fs.existsSync(dest + destFile)) {
      fs.unlinkSync(dest + destFile)
    } else {

    }
    fs.copyFileSync(firm.getActiveDB().path, dest + destFile);
  } catch (e) {
    console.log(e)
  }

}

function loadMainProcess() {
  if (process.env.NODE_ENV === 'production') {
    function requireAll(r) {
      r.keys().forEach(r);
    }
    requireAll(require.context('./electron/', true, /\.js$/));
  } else {
    const files = glob.sync(
      path.join(__dirname, "electron/main-processes/**/*.js")
    );
    files.forEach((file) => {
      file = file.split("electron/main-processes/")[1]
      require(`./electron/main-processes/${file}`)
      sout(`require(./electron/main-processes/${file})`)
    });
  }
}
/**
 * @returns Promise<Connection>
 */
async function setDatabaseConnection(dbName) {
  const connection = await createConnection({
    ...typeOrmConf,
    database: dbName
  });
  if (process.env.NODE_ENV === 'production') {
    await syncTypeORM(connection);
  }
  return connection;
}

async function syncTypeORM(connection) {
  await connection.query("PRAGMA foreign_keys=OFF");
  await connection.synchronize();
  await connection.query("PRAGMA foreign_keys=ON");
}

function sout(...l) {
  log.info(...l)
}


var handleStartupEvent = function () {
  if (process.argv.length === 1) {
    return false;
  }

  const ChildProcess = require('child_process');
  const path = require('path');

  const appFolder = path.resolve(process.execPath, '..');
  const rootAtomFolder = path.resolve(appFolder, '..');
  const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
  const exeName = path.basename(process.execPath);

  const spawn = function (command, args) {
    let spawnedProcess, error;

    try {
      spawnedProcess = ChildProcess.spawn(command, args, {
        detached: true
      });
    } catch (error) { }

    return spawnedProcess;
  };

  const spawnUpdate = function (args) {
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

      setTimeout(app.quit, 1000);
      return true;

    case '--squirrel-uninstall':
      // Undo anything you did in the --squirrel-install and
      // --squirrel-updated handlers

      // Remove desktop and start menu shortcuts
      spawnUpdate(['--removeShortcut', exeName]);

      setTimeout(app.quit, 1000);
      return true;

    case '--squirrel-obsolete':
      // This is called on the outgoing version of your app before
      // we update to the new version - it's the opposite of
      // --squirrel-updated
      app.isQuiting = true

      app.quit();
      return true;
  }
};

function registerAppEventListeners() {

  require("./electron/main-processes/ipc-calls/FirmInfoIPC")

  promiseIpc.on("app/relaunch", () => {
    console.log("ASDASD")
    app.relaunch();
    app.exit();
  });


  promiseIpc.on("app/quit", () => {
    app.quit();
  });

}

function appUpdater() {
  log.transports.file.level = 'info';
  autoUpdater.logger = log;
  autoUpdater.requestHeaders = {
    gstin: "123",
    machineId: "123"
  }
  autoUpdater.checkForUpdatesAndNotify();


  /*checking for updates*/
  autoUpdater.on("checking-for-update", (info) => {
    sout("checking-for-update", info)
  });

  /*No updates available*/
  autoUpdater.on("update-not-available", info => {
    sout("update-not-available", info)
  });

  /*New Update Available*/
  autoUpdater.on("update-available", info => {
    sout("update-available", info)
  });

  /*Download Status Report*/
  autoUpdater.on("download-progress", progressObj => {
    sout("download-progress", progressObj)
  });

  /*Download Completion Message*/
  autoUpdater.on("update-downloaded", (event, releaseNotes, releaseName) => {
    sout("update-downloaded", (event, releaseNotes, releaseName))
    const dialogOpts = {
      type: 'info',
      buttons: ['Restart', 'Not Now. On next Restart'],
      title: 'Update',
      message: process.platform === 'win32' ? releaseNotes : releaseName,
      detail: 'A New Version has been Downloaded. Restart SSAS software now to Complete the Update.'
    }

    dialog.showMessageBox(dialogOpts).then((returnValue) => {
      if (returnValue.response === 0) autoUpdater.quitAndInstall()
    })
  });

  autoUpdater.on('error', message => {
    sout('There was a problem updating the application', message)
  })


}


init()
