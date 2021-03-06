
import promiseIpc from "electron-promise-ipc";
import BillsDetailService from "../../services/BillsDetailService";
const createPath = (endpoint) => "BillsDetail/" + endpoint;

const service = new BillsDetailService();

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
