const { BrowserWindow, app } = require('electron');
const fs = require('fs');
const path = require("path");
const appData = app.getPath("appData") + "/ssas/"
console.log(appData);
const { MODAL_ROUTES } = require('../../Constants/routes');
const { FIRM_INFO_API_URL } = require('../../Constants/URLS');
// const FILE_PATH = path.join(__dirname, "../../firm-data")
const FILE_PATH = appData + "firm-data";
// const DB_PATH = __dirname + '../../databases';
const DB_PATH = appData + "/databases/";

const CURRENT_MACHINE_ID = "54f5sd-sdfgdshdf-sdfhg-sdf234" // we need to install machine id related library for now it is static

const axios = require("axios").default
const moment = require("moment")

const bluePrintData = {
  /**
   * @type {Array.<string>}
   */
  machineIds: [],
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
const INVALID_REASONS = {
  DATA_NOT_FOUND: "Data Not Found.",
  SOFTWARE_EXPIRED: "Software is expired.",
  TRIAL_OVER: "Software trial period is over.",
  CUSTOMER_INVALID: "Customer is invalid.",
  FIRM_NOT_FOUND: "There are no any valid firm found.",
  DATABASE_NOT_FOUND: "There is no active database found.",
  MACHINE_ID_NOT_MATCHED: "This software is copy of another machine/coputer's software",
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

  constructor() {
    this.load()
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
    return moment(this.data.endDate).diff(moment(new Date()), 'days')
  }
  checkIsValid() {
    let res = { status: false, reason: null }
    if (!this.data)
      res.reason = INVALID_REASONS.DATA_NOT_FOUND
    else if ((this.data.machineIds?.length ?? 0) === 0)
      res.reason = INVALID_REASONS.CUSTOMER_INVALID
    // else if (!this.data.machineIds?.includes(CURRENT_MACHINE_ID))
    //   res.reason = INVALID_REASONS.MACHINE_ID_NOT_MATCHED
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
      gstin: payload.gstin
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
        machineIds: [data.machine_id],
        firms: [{
          id: data.id,
          name: payload.name,
          default: payload.default ?? true,
          state: 24,
          gstin: data.gstin,
          pan: payload.pan,
          mobile: payload.moble,
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
        endDate: new Date(data.end_date),
        startDate: new Date(data.start_date),
        isInTrialMode: data.licence_type === "TRIAL",
      })
      return Promise.resolve({ message: "firm created", data: data })
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
