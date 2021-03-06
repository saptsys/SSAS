
const promiseIpc = require("electron-promise-ipc");
const SettingsMasterService = require("../../services/SettingsMasterService");
const createPath = (endpoint) => "SettingsMaster/" + endpoint;

const service = new SettingsMasterService();

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