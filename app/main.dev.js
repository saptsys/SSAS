/**
 * @flow
 */
import {
  app,
  BrowserWindow
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
export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

function init() {


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
          name: "ABC Photo Ltd.",
          default: true,
          state: 24
        }],
        databases: [{
          id: 1,
          year: '2020-21',
          active: true
        }],
        expiryDate: function () {
          const d = new Date();
          d.setDate(d.getDate() + 1);
          return d
        }(),
        renewedDate: new Date()
      })
      sout("\n\nnew dummy firm info created please restart")
      // app.relaunch()
    }
    sout(`-*-*-*-*-*-*-*-*-* Exiting... Due to ${reason} *-*-*-*-*-*-*-*-*-*-\n\n`)
    app.exit()
  }
  sout("database connecting: " + firmInfo.activeDBPath);
  setDatabaseConnection(firmInfo.activeDBPath)
    .then(() => {
      sout("database connected ");
      loadMainProcess();
    })
    .catch((e) => {
      console.log(e)
      sout("database connection failed");
      app.quit();
    });


  let mainWindow = null;

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
    const windowOptions = {
      webPreferences: {
        nodeIntegration: true,
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

    mainWindow = new BrowserWindow(windowOptions);
    mainWindow.setMenu(null)
    mainWindow.loadURL(`file://${__dirname}/app.html`);
    mainWindow.webContents.openDevTools({ mode: "detach" });

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

    mainWindow.on('closed', () => {
      mainWindow = null;
    });

    // Remove this if your app does not use auto updates
    // eslint-disable-next-line
    new AppUpdater();
  });

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
function setDatabaseConnection(dbName) {
  let connectionPromise = createConnection({
    ...typeOrmConf,
    database: dbName
  });
  connectionPromise.then((connection) => {
    syncTypeORM(connection);
  });
  return connectionPromise;
}

async function syncTypeORM(connection) {
  await connection.query("PRAGMA foreign_keys=OFF");
  await connection.synchronize();
  await connection.query("PRAGMA foreign_keys=ON");
}

function sout(log) {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    let line = "/n" + new Date() + " || " + log + "\n\n";
    console.log(line)
    require("fs").appendFileSync("log.txt", line);
  }
}
init()
