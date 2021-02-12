
const promiseIpc = require("electron-promise-ipc");
const ItemGroupMasterService = require("../../services/ItemGroupMasterService");
const createPath = (endpoint) => "ItemGroupMaster/" + endpoint;

const service = new ItemGroupMasterService();

promiseIpc.on(createPath("getAll"), () => {
  return service.getAll();
});

promiseIpc.on(createPath("save"), (payload) => {
  return service.save(payload);
});

promiseIpc.on(createPath("getById"), (payload) => {
  return service.getById(payload);
});
        