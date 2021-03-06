import promiseIpc  from "electron-promise-ipc";
import { FirmInfoService } from "../../services/FirmInfoService";

const createPath = (endpoint) => "FirmInfo/" + endpoint;

const service = new FirmInfoService();

promiseIpc.on(createPath("getData"), () => {
    return new Promise((resolve, reject) => {
        try {
            const data = service.getData()
            resolve(data)
        } catch (e) {
            reject(e)
        }
    })
});
promiseIpc.on(createPath("getAllFirms"), () => {
    return new Promise((resolve, reject) => {
        try {
            const data = service.getAllFirms()
            resolve(data)
        } catch (e) {
            reject(e)
        }
    })
});
promiseIpc.on(createPath("getAllDB"), () => {
    return new Promise((resolve, reject) => {
        try {
            const data = service.getAllDB()
            resolve(data)
        } catch (e) {
            reject(e)
        }
    })
});
