
import promiseIpc  from "electron-promise-ipc";
import ItemMasterService from "../../services/ItemMasterService";
const createPath = (endpoint) => "ItemMaster/" + endpoint;

const service = new ItemMasterService();

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

