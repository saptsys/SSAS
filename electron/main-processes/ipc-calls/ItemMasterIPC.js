
const promiseIpc = require("electron-promise-ipc");
const ItemMasterService = require("../../services/ItemMasterService");
const createPath = (endpoint) => "ItemMaster/" + endpoint;

const service = new ItemMasterService();

promiseIpc.on(createPath("getAll"), () => {
  return service.getAll();
});

promiseIpc.on(createPath("save"), (payload) => {
  console.log(payload)

  return service.save(payload);
});

promiseIpc.on(createPath("getById"), (payload) => {
  return service.getById(payload);
});
        