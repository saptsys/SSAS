
const promiseIpc = require("electron-promise-ipc");
const TaxMasterService = require("../../services/TaxMasterService");
const createPath = (endpoint) => "TaxMaster/" + endpoint;

const service = new TaxMasterService();

promiseIpc.on(createPath("getAll"), () => {
  return service.getAll();
});

promiseIpc.on(createPath("save"), (payload) => {
  return service.save(payload);
});

promiseIpc.on(createPath("getById"), (payload) => {
  return service.getById(payload);
});
        
promiseIpc.on(createPath("delete"), (payload) => {
  return service.delete(payload);
});