
const promiseIpc = require("electron-promise-ipc");
const ItemUnitMasterService = require("../../services/ItemUnitMasterService");
const createPath = (endpoint) => "ItemUnitMaster/" + endpoint;

const service = new ItemUnitMasterService();

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

promiseIpc.on(createPath("checkUnique"), (payload) => {
  return service.doCheckUnique(payload);
});