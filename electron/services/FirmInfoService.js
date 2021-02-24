const fs = require('fs');

const firmInfo = {
    ssasId: "FS52S36D8T1",
    firms: [
        {
            id: 1,
            firmName: "ABC Photo Ltd",
            gstin: "",
            pan: "",
            address: "",
            city: "",
            state: "",
            mobile: "",
            phone: "",
            email: "",
            default: true
        }
    ],
    databases: [
        { id: 1, year: '2020-21', active: false },
        { id: 2, year: '2021-22', active: true },
    ],
    expiryDate: '2022-03-31',
    trialStart: '2022-04-01',
    trialDuration: 14,

}
class FirmInfoService {
    encode(content) {
        return Buffer.from(content).toString('base64').split('').map(x => x.charCodeAt()).join('.')
    }
    decode(content) {
        const b64 = content.split('.').map(x => String.fromCharCode(x)).join("")
        return Buffer.from(b64, 'base64').toString()
    }

    createNew(data = firmInfo) {
        const dataToWrite = this.encode(JSON.stringify(data))
        fs.writeFile('../../firminfo', dataToWrite, err => console.log(err ? err : ""))
    }
    load() {
        let fromFile = ""
        fs.readFile('../../firminfo', null, (err, data) => fromFile = data)
        let dataToRead = this.decode(fromFile)
        console.log(JSON.parse(dataToRead))
    }
}
const a = new FirmInfoService()
a.createNew()
a.load()