const fs = require('fs');
const path = require("path")
const FILE_PATH = path.join(__dirname, "../../firm-data")

const CURRENT_MACHINE_ID = "54f5sd-sdfgdshdf-sdfhg-sdf234" // we need to install machine id related library for now it is static

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
     * @type {Array.<{id:BigInt,year:String,active:Boolean}>}
     */
    databases: [],
    /**
     * @type {Date}
     */
    renewedDate: null,
    /**
     * @type {Date}
     */
    expiryDate: null,
    /**
     * @type {Date}
     */
    trialStart: null,
    /**
     * @type {Int8Array}
     */
    trialDuration: 0,
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
    async load() {
        if (fs.existsSync(FILE_PATH)) {
            let fromFile = fs.readFileSync(FILE_PATH, { encoding: 'utf8', flag: 'r' });
            let dataToRead = this.decode(fromFile)
            this.data = JSON.parse(dataToRead)
            const dbYear = this.getActiveDB()
            if (dbYear)
                this.activeDBPath = dbYear.path
        }
        this.checkIsValid()
    }
    trialLeftDays() {
        const trialEnd = new Date(this.data.trialStart)
        trialEnd.setDate(trialEnd.getDate() + this.data.trialDuration)
        const left = (trialEnd - new Date()) / (1000 * 60 * 60 * 24)
        return left > 0 ? left : 0
    }
    expiryLeftDays() {
        if (!this.data.expiryDate)
            return 0
        const expiry = new Date(this.data.expiryDate)
        const left = (expiry - new Date()) / (1000 * 60 * 60 * 24)
        return left > 0 ? left : 0
    }
    checkIsValid() {
        let res = { status: false, reason: null }
        if (!this.data)
            res.reason = INVALID_REASONS.DATA_NOT_FOUND
        else if ((this.data.machineIds?.length ?? 0) === 0)
            res.reason = INVALID_REASONS.CUSTOMER_INVALID
        else if (!this.data.machineIds?.includes(CURRENT_MACHINE_ID))
            res.reason = INVALID_REASONS.MACHINE_ID_NOT_MATCHED
        else if (this.expiryLeftDays() === 0 && this.data.trialStart && this.trialLeftDays() === 0)
            res.reason = INVALID_REASONS.TRIAL_OVER
        else if (!this.data?.firms?.length || !this.data.firms.some(x => x.id && x.name && x.default))
            res.reason = INVALID_REASONS.FIRM_NOT_FOUND
        else if (!this.data?.databases?.length || !this.getActiveDB())
            res.reason = INVALID_REASONS.DATABASE_NOT_FOUND
        else
            res.status = true
        this.isValid = res
    }
    getActiveDB() {
        return this.data.databases.map(x => ({ ...x, path: path.join(__dirname, '../../databases', `FY${x.year}.db`) })).find(x => x.id && x.year && x.active === true)
    }
    getData() {
        return this.data
    }
}


module.exports = {
    INVALID_REASONS,
    FirmInfoService
}