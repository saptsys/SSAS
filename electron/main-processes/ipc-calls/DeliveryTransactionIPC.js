
const promiseIpc = require("electron-promise-ipc");
const DeliveryTransactionService = require("../../services/DeliveryTransactionService");
const createPath = (endpoint) => "DeliveryTransaction/" + endpoint;

const service = new DeliveryTransactionService();

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