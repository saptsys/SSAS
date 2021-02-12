
const promiseIpc = require("electron-promise-ipc");
const BillsTransactionService = require("../../services/BillsTransactionService");
const createPath = (endpoint) => "BillsTransaction/" + endpoint;

const service = new BillsTransactionService();

promiseIpc.on(createPath("getAll"), () => {
  return service.getAll();
});

promiseIpc.on(createPath("save"), (payload) => {
  return service.save(payload);
});

promiseIpc.on(createPath("getById"), (payload) => {
  return service.getById(payload);
});
        