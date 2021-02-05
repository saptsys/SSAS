const promiseIpc = require("electron-promise-ipc");
const { PARTY_MASTER } = require("../../../Constants/Ipc-Calls");
const { PartyMaster } = require("../../../dbManager/models");
const PartyMasterService = require("../../services/PartyMasterSevice");


promiseIpc.on(PARTY_MASTER.getAll, () => {
    const service = new PartyMasterService()
    return service.getAll()
});