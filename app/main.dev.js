/**
 * @flow
 */
import {
  app,
  BrowserWindow,
  Tray, Menu
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
  INVALID_REASONS
} from "./electron/services/FirmInfoService";

import { glob } from "glob";
import path from 'path'
import initDB from "./InitDB"
import fs from "fs";
const appData =  app.getPath("appData") + "/ssas/"

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

function init() {
  if (handleStartupEvent()) {
    return;
  }
  let mainWindow = null;

  const gotTheLock = app.requestSingleInstanceLock()
  if (!gotTheLock) {
    app.isQuiting = true
    app.quit()
    return
  }
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })

  const firmInfo = new FirmInfoService()
  if (firmInfo.isValid.status === false) {
    const {
      reason
    } = firmInfo.isValid
    if (reason === INVALID_REASONS.DATA_NOT_FOUND) {

      firmInfo.createNew({
        machineIds: ["54f5sd-sdfgdshdf-sdfhg-sdf234"],
        firms: [{
          id: 1,
          name: "XENEX DESIGNS",
          default: true,
          state: 24,
          gstin: "24AJIPJ6601R3ZT",
          pan: "AJIPJ6601R",
          mobile: "9377266111",
          email: "xenexdesigns648@mail.com",
          address: "822,BELGIUM TOWERRING ROAD,SURAT,GUJARAT",
          city: "SURAT",
        }],
        databases: [{
          id: 1,
          year: '2020-21',
          active: true,
          initialized: false
        }],
        expiryDate: function () {
          const d = new Date();
          d.setDate(d.getDate() + 30);
          return d
        }(),
        renewedDate: new Date()
      })
      sout("\n\nnew dummy firm info created please restart")

      // app.relaunch()
    }



    sout(`-*-*-*-*-*-*-*-*-* Exiting... Due to ${reason} *-*-*-*-*-*-*-*-*-*-\n\n`)
    app.relaunch()
    // app.exit()
  }

  sout("database connecting: " + firmInfo.activeDBPath);
  setDatabaseConnection(firmInfo.activeDBPath)
    .then(async (connection) => {
      sout("database connected ");

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
      mainWindow.webContents.openDevTools({ mode: "detach" });
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

    // firmInfo.openNewDialog()
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

    mainWindow.on('close', function (event) {
      // if (!app.isQuiting) {
      //   event.preventDefault()
      //   mainWindow.hide()
      // }
      takeDatabaseBackup();

    })

    // mainWindow.on('show', function () {
    //   appIcon.setHighlightMode('always')
    // })

    mainWindow.on('closed', () => {
      mainWindow = null;
    });

    // Remove this if your app does not use auto updates
    // eslint-disable-next-line
    new AppUpdater();
  });

}

function takeDatabaseBackup(){
  const firm = new FirmInfoService();
  let destFile = new Date().toLocaleDateString().split("/").join("-") + "-ssas.bak"
  let dest =  appData + `backups/daily/`
  if(!fs.existsSync(dest)){
    fs.mkdirSync(dest , {recursive:true});
  }


  if(fs.existsSync(dest + destFile)){
    fs.unlinkSync(dest + destFile)
  }else{

  }
  fs.copyFileSync(firm.getActiveDB().path , dest + destFile);
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



init()
