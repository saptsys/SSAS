
const promiseIpc = require("electron-promise-ipc");
const DeliveryChallanService = require("../../services/DeliveryChallanService");
const createPath = (endpoint) => "DeliveryChallan/" + endpoint;

const service = new DeliveryChallanService();

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

promiseIpc.on(createPath("getLastChalanAndVoucherNumber"), () => {
  return service.getLastChalanAndVoucherNumber();
});

promiseIpc.on(createPath("search"), (payload) => {
  return service.search(payload);
});


promiseIpc.on(createPath("getByPartyAndDate"), (payload) => {
  return service.getByPartyAndDate(payload);
});


promiseIpc.on(createPath("getByPartyListAndDateInterval"), (payload) => {
  return service.getByPartyListAndDateInterval(payload);
});
