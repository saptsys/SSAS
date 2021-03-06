/* eslint global-require: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
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
import * as glob from "glob";
import * as path from "path";

import BillsDetailEntity from "./dbManager/entities/BillsDetailEntity"
import BillsTransactionEntity from "./dbManager/entities/BillsTransactionEntity"
import DeliveryDetailEntity from "./dbManager/entities/DeliveryDetailEntity"
import DeliveryTransactionEntity from "./dbManager/entities/DeliveryTransactionEntity"
import ItemGroupMasterEntity from "./dbManager/entities/ItemGroupMasterEntity"
import ItemMasterEntity from "./dbManager/entities/ItemMasterEntity"
import ItemUnitMasterEntity from "./dbManager/entities/ItemUnitMasterEntity"
import PartyMasterEntity from "./dbManager/entities/PartyMasterEntity"
import SettingsMasterEntity from "./dbManager/entities/SettingsMasterEntity"
import TaxMasterEntity from "./dbManager/entities/TaxMasterEntity"


const entities = [
  BillsDetailEntity,
  BillsTransactionEntity,
  DeliveryDetailEntity,
  DeliveryTransactionEntity,
  ItemGroupMasterEntity,
  ItemMasterEntity,
  ItemUnitMasterEntity,
  PartyMasterEntity,
  SettingsMasterEntity,
  TaxMasterEntity,
]

export class AppUpdater {
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
          default: true
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
      sout(JSON.stringify(e))
      // app.quit();
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

    mainWindow = new BrowserWindow({
      show: false,
      width: 1024,
      height: 728,
      webPreferences: {
        nodeIntegration: true
      },
      preload: __dirname + "/preload.js",
    });

    mainWindow.loadURL(`file://${__dirname}/app.html`);

    // @TODO: Use 'ready-to-show' event
    //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
    mainWindow.webContents.on('did-finish-load', () => {
      if (!mainWindow) {
        throw new Error('"mainWindow" is not defined');
      }
      if (process.env.START_MINIMIZED) {
        mainWindow.minimize();
      } else {
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
  const files = glob.sync(
    path.join(__dirname, "electron/main-processes/**/*.js")
  );
  files.forEach((file) => {
    file = file.split("/").pop()
    console.log(file)
    require(`./electron/main-processes/ipc-calls/${file}`)
  });
}
/**
 * @returns Promise<Connection>
 */
function setDatabaseConnection(dbName) {
  let connectionPromise = createConnection({
    "type": "sqlite",
    'folder': "./dbManager",
    "synchronize": false,
    "logging": false,
    "entities": [],
    database: dbName
  });
  connectionPromise.then((connection) => {
    console.log(connection);
    syncTypeORM(connection);
  })
  return connectionPromise;
}

async function syncTypeORM(connection) {
  await connection.query("PRAGMA foreign_keys=OFF");
  await connection.synchronize();
  await connection.query("PRAGMA foreign_keys=ON");
}

function sout(log) {
  let line = "/n" + new Date() + " || " + log + "\n\n";
  console.log(line)
  require("fs").appendFileSync("log.txt", line);
}
init()
