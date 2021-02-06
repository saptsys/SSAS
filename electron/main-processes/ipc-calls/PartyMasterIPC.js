const promiseIpc = require("electron-promise-ipc");
const PartyMasterService = require("../../services/PartyMasterSevice");

const createPath = (endpoint) => "PartyMaster/" + endpoint

promiseIpc.on(createPath("getAll"), () => {
    const service = new PartyMasterService()
    return service.getAll()
});