
const promiseIpc = require("electron-promise-ipc");
const DeliveryDetailService = require("../../services/DeliveryDetailService");
const createPath = (endpoint) => "DeliveryDetail/" + endpoint;

const service = new DeliveryDetailService();

promiseIpc.on(createPath("getAll"), () => {
  return service.getAll();
});

promiseIpc.on(createPath("save"), (payload) => {
  return service.save(payload);
});

promiseIpc.on(createPath("getById"), (payload) => {
  return service.getById(payload);
});
        