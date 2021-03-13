const promiseIpc = require("electron-promise-ipc");
const createPath = (endpoint) => "Print/" + endpoint;
const PrintService = require("../../services/PrintService");

const service = new PrintService();

promiseIpc.on(createPath("challan"), (payload) => {
  return service.challan(payload)
});
