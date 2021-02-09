const promiseIpc = require("electron-promise-ipc");
const PartyMasterService = require("../../services/PartyMasterSevice");

const createPath = (endpoint) => "PartyMaster/" + endpoint;

const service = new PartyMasterService();

promiseIpc.on(createPath("getAll"), () => {
  setTimeout(() => {
    return service.getAll();
  }, 100);
});

promiseIpc.on(createPath("save"), (payload) => {
  return service.save(payload);
});
