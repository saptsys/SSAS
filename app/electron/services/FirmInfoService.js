const log = require('electron-log');
const { BrowserWindow, app } = require('electron');
const fs = require('fs');
const path = require("path");
const appData = app.getPath("appData") + "/ssas/"
console.log(appData);
const { MODAL_ROUTES } = require('../../Constants/routes');
const { FIRM_INFO_API_URL, ASK_FOR_TRIAL_API_URL } = require('../../Constants/URLS');
const { INVALID_REASONS } = require('../../Constants/SoftwareInvalidReasons');
// const FILE_PATH = path.join(__dirname, "../../firm-data")
const FILE_PATH = appData + "firm-data";
// const DB_PATH = __dirname + '../../databases';
const DB_PATH = appData + "/databases/";

const axios = require("axios").default
const moment = require("moment")
const { machineIdSync } = require('node-machine-id')
const os = require('os');
const { parseServerDate } = require('../../src/helpers/utils');

const CURRENT_MACHINE_ID = machineIdSync({ original: true })
const CURRENT_MACHINE_NAME = `${os.userInfo().username} @ ${os.hostname()}`

const bluePrintData = {
  /**
   * @type {Array.<string>}
   */
  machineId: null,
  /**
   * @type {Array.<{id: BigInt, name: String, gstin: String, pan: String, address: String, city: String, state: String, mobile: String, phone: String, email: String, default: Boolean}>}
   */
  firms: [],
  /**
   * @type {Array.<{id:BigInt,year:String,active:Boolean,initialized:Boolean}>}
   */
  databases: [],
  /**
   * @type {Date}
   */
  startDate: null,
  /**
   * @type {Date}
   */
  endDate: null,
  /**
   * @type {boolean}
   */
  isInTrialMode: false,
  /**
   * @type {int}
   */
  expiryLeftDays: 0
}

class FirmInfoService {

  /**
   * @type {bluePrintData}
   */
  data = null
  /**
   * @type {{status:boolean,reason:string}}
   */
  isValid = null
  /**
   * @type {string}
   */
  activeDBPath = null

  constructor(syncWithServer = false) {
    this.load()
    if (syncWithServer && (!this.isValid?.status ?? false ? this.isValid.reason != INVALID_REASONS.DATA_NOT_FOUND : true)) {
      this.syncWithServer()
    }
  }

  encode(content) {
    return Buffer.from(content).toString('base64').split('').map(x => {
      const asci = x.charCodeAt()
      return asci < 10 ? "00" + asci : asci < 100 ? "0" + asci : asci
    }).join('')
  }
  decode(content) {
    const b64 = String.fromCharCode(...content.match(/.{1,3}/g))
    return Buffer.from(b64, 'base64').toString()
  }

  /**
   * @param {bluePrintData} data
   */
  async createNew(data) {
    const dataToWrite = this.encode(JSON.stringify(data))
    fs.writeFileSync(FILE_PATH, dataToWrite, { encoding: 'utf8', flag: 'w' })
    await this.load()
  }

  async update(data) {
    const dataToWrite = this.encode(JSON.stringify(data))
    fs.writeFileSync(FILE_PATH, dataToWrite, { encoding: 'utf8', flag: 'w' })
    await this.load()
  }

  async load() {
    if (fs.existsSync(FILE_PATH)) {
      let fromFile = fs.readFileSync(FILE_PATH, { encoding: 'utf8', flag: 'r' });
      let dataToRead = this.decode(fromFile)
      this.data = JSON.parse(dataToRead)
      this.data.expiryLeftDays = this.expiryLeftDays()
      const dbYear = this.getActiveDB()
      if (dbYear)
        this.activeDBPath = dbYear.path
    }
    this.checkIsValid()
  }
  expiryLeftDays() {
    var today = moment(new Date());
    today = today.add(1,"days")
    return moment(this.data.endDate).diff(today, 'days')

    // return (new Date(this.data.endDate).getDate()) - (new Date().getDate())
  }
  checkIsValid() {
    // console.log("Actual Machine Id==>" + CURRENT_MACHINE_ID)
    // console.log("Stored Machine Id==>" + this.data.machineId)
    let res = { status: false, reason: null }
    if (!this.data)
      res.reason = INVALID_REASONS.DATA_NOT_FOUND
    // else if (!(this.data.machineId ?? 0))
    //   res.reason = INVALID_REASONS.CUSTOMER_INVALID
    else if (this.data.machineId !== CURRENT_MACHINE_ID)
      res.reason = INVALID_REASONS.MACHINE_ID_NOT_MATCHED
    else if (this.expiryLeftDays() <= 0)
      res.reason = this.data.isInTrialMode ? INVALID_REASONS.TRIAL_OVER : INVALID_REASONS.SOFTWARE_EXPIRED
    else if (!this.data?.firms?.length || !this.data.firms.some(x => x.id && x.name && x.default))
      res.reason = INVALID_REASONS.FIRM_NOT_FOUND
    else if (!this.data?.databases?.length || !this.getActiveDB())
      res.reason = INVALID_REASONS.DATABASE_NOT_FOUND
    else
      res.status = true
    this.isValid = res
  }
  getActiveDB() {
    return this.data.databases.map(x => ({ ...x, path: path.join(DB_PATH, `FY${x.year}.db`) })).find(x => x.id && x.year && x.active === true)
  }
  getData() {
    return { ...this.data }
  }

  /**
   *
   * @param {Boolean} status
   */
  setInit(status = true) {
    let activeDB = this.getActiveDB()
    let data = this.getData()
    data.databases = data.databases.map(x => {
      return {
        ...x,
        initialized: x.id === activeDB.id ? status : x.initialized
      }
    })
    this.createNew(data)
  }

  openNewDialog() {
    const preloadFile = (process.env.NODE_ENV === 'production')
      ? __dirname + "/preload.js"
      : path.join(`${__dirname}/../../`, "/preload.js")

    const appHtmlFile = (process.env.NODE_ENV === 'production')
      ? `${__dirname}/app.html`
      : `${__dirname}/../../app.html`

    let win = new BrowserWindow({
      webPreferences: {
        nodeIntegration: true,
        webSecurity: true,
        contextIsolation: false,
        preload: preloadFile,
      },
      title: MODAL_ROUTES.firmInfoModal._title,
      frame: false,
      center: true,
      height: 500
      // parent: webContents.getFocusedWebContents()
    });
    win.setMenu(null)
    // win.webContents.openDevTools();


    console.log(appHtmlFile)
    win.loadURL(`file://${appHtmlFile}#${MODAL_ROUTES.firmInfoModal._path}`);

    win.webContents.on('did-finish-load', async () => {

      // win.setSize(500, 500, true);
      win.show()
    })
  }

  /*
  Expecting this format

          name: "XENEX DESIGNS",
          default: true,
          state: 24,
          gstin: "24AJIPJ6601R3ZT",
          pan: "AJIPJ6601R",
          mobile: "9377266111",
          email: "xenexdesigns648@mail.com",
          address: "822,BELGIUM TOWERRING ROAD,SURAT,GUJARAT",
          city: "SURAT",
  */

  async save(payload) {

    console.log("~~~~~~~~~~~~~~~~~~~~")
    console.log(payload)
    console.log("~~~~~~~~~~~~~~~~~~~~")

    const that = this;

    return axios.post(FIRM_INFO_API_URL, {
      gstin: payload.gstin,
      machineId: CURRENT_MACHINE_ID,
      machineName: CURRENT_MACHINE_NAME,
    }).then(function (response) {
      const data = response.data
      console.log("response +++++++++++++ ", response.data)

      // const isExpired = data.expired
      // if (isExpired) {
      //   return Promise.reject("Trial Period is Expired! If You Still Want to Use Then Buy Licence")
      // }

      const isNew = !data.existing;

      const d = new Date();
      const year = d.getFullYear()
      const month = d.getMonth() + 1
      const fiscalYear = month > 3 ? year + "-" + ((year + 1) % 100) : year - 1 + "-" + (year % 100)


      that.createNew({
        machineId: data.machine_id,
        firms: [{
          id: data.id,
          name: payload.name,
          default: payload.default ?? true,
          state: payload.state ?? 24,
          gstin: data.gstin,
          pan: payload.pan,
          mobile: payload.mobile,
          phone: payload.phone,
          email: payload.email,
          address: payload.address,
          city: payload.city,
        }],
        databases: [{
          id: 1,
          year: fiscalYear,
          active: true,
          initialized: false
        }],
        endDate: parseServerDate(data.end_date),
        startDate: parseServerDate(data.start_date),
        isInTrialMode: data.licence_type === "TRIAL",
      })
      return Promise.resolve({ message: "firm created", data: data })
    }).catch(function (response) {
      console.log("response ---------------- ", response)
      return Promise.reject({ message: response?.message ?? "something went wrong." })
    })
  }


  async syncWithServer() {
    console.log("Trying to syncing firm data....")
    const that = this;
    return axios.post(FIRM_INFO_API_URL, {
      gstin: that.data.firms.find(x => x.default)?.gstin,
      machineId: CURRENT_MACHINE_ID,
      machineName: CURRENT_MACHINE_NAME,
    }).then(async function (response) {

      const data = {
        ...response.data,
        end_date: parseServerDate(response.data.end_date),
        start_date: parseServerDate(response.data.start_date),
      }

      const formatDateTimeForCompare = (date) => moment(new Date(date)).format('YYYY-MM-DD')
      let needToRelaunch =
        formatDateTimeForCompare(that.data.endDate) !== formatDateTimeForCompare(data.end_date) ||
        formatDateTimeForCompare(that.data.startDate) !== formatDateTimeForCompare(data.start_date) ||
        that.data.isInTrialMode !== (data.licence_type === "TRIAL");

      that.data.endDate = new Date(data.end_date)
      that.data.startDate = new Date(data.start_date)
      that.data.isInTrialMode = data.licence_type === "TRIAL"
      that.data.machineId = data.machine_id
      that.data.firms = that.data.firms.map(fi => {
        if (needToRelaunch === false)
          needToRelaunch = fi.gstin !== data.gstin
        if (fi.default) {
          fi.gstin = data.gstin
          fi.state = fi.gstin.substr(0, 2)
          fi.pan = fi.gstin.substr(2, 10)
        }
        return fi;
      })
      await that.update(that.data)
      console.log("Firm Data Synced.")
      log.info("Firm Data Synced. --->", JSON.stringify(data))
      if (needToRelaunch) {
        console.log("Firm data changed by server, relaunching the app")
        log.info("Firm data changed by server, relaunching the app")
        app.relaunch()
        app.quit()
      }
    }).catch(function (err) {
      console.log("Firm Data Syncing Error ---> ", JSON.stringify(err))
      log.info("Firm Data Syncing Error ---> ", JSON.stringify(err))
    })
  }


  updateFirm(payload) {
    try {
      this.data.firms = this.data.firms.map(firm => {
        if (firm.id === payload.id) {
          ["name", "address", "city", "email", "mobile", "phone"].forEach(k => firm[k] = payload[k])
        }
        return firm
      })
      this.update(this.data)
      return Promise.resolve("updated")
    } catch (error) {
      return Promise.reject({ message: 'Firm not updated due to ' + (error?.message ?? "") })
    }
  }

  /**
   *
   * @param {INVALID_REASONS} type
   */
  openInvalidSoftwareDialog(type) {
    const preloadFile = (process.env.NODE_ENV === 'production')
      ? __dirname + "/preload.js"
      : path.join(`${__dirname}/../../`, "/preload.js")

    const appHtmlFile = (process.env.NODE_ENV === 'production')
      ? `${__dirname}/app.html`
      : `${__dirname}/../../app.html`

    let win = new BrowserWindow({
      webPreferences: {
        nodeIntegration: true,
        webSecurity: true,
        contextIsolation: false,
        preload: preloadFile,
      },
      title: type,
      frame: true,
      maximizable: false,
      minimizable: false,
      center: true,
      resizable: false,
      height: 480,
      width: 720,
      alwaysOnTop: true,
      // parent: webContents.getFocusedWebContents()
    });
    win.setMenu(null)
    if (process.env.NODE_ENV !== 'production')
      win.webContents.openDevTools();


    console.log(appHtmlFile)
    win.loadURL(`file://${appHtmlFile}#${MODAL_ROUTES.softwareValidations._path.replace(":type", type)}`);
    win.webContents.on('did-finish-load', async () => {
      win.setSize(720, 480, true);
      win.show()
    })
    win.on('close', () => {
      app.quit()
    })
  }

  askForTrial() {

    const that = this;

    return axios.post(ASK_FOR_TRIAL_API_URL, {
      gstin: that.data.firms.find(x => x.default)?.gstin,
      machineId: that.data.machineId,
      machineName: CURRENT_MACHINE_NAME,
    }).then(function (response) {
      const data = response.data

      that.data.endDate = new Date(data.end_date)
      that.data.startDate = new Date(data.start_date)
      that.data.isInTrialMode = data.licence_type === "TRIAL"
      that.update(that.data)

      return Promise.resolve({ message: `😉 Trial granted for ${that.expiryLeftDays()} day(s) from today. 🎉`, data: data })

    }).catch(function (response) {
      console.log("response ---------------- ", response)
      return Promise.reject({ message: response?.message ?? "something went wrong." })
    })
  }

}

module.exports = {
  INVALID_REASONS,
  FirmInfoService
}
