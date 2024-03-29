
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

promiseIpc.on(createPath("update"), (payload) => {
  return service.update(payload);
});

promiseIpc.on(createPath("getDetailsById"), (payload) => {
  return service.getDetailsById(payload);
});

promiseIpc.on(createPath("getByIdWithDetails"), (payload) => {
  return service.getByIdWithDetails(payload);
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

promiseIpc.on(createPath("getByChalanNumberWithDetails"), (payload) => {
  return service.getByChalanNumberWithDetails(payload);
});

promiseIpc.on(createPath("getWithDetailsByPartiesAndDate"), (payload) => {
  return service.getWithDetailsByPartiesAndDate(payload);
});

promiseIpc.on(createPath("getTotalBills"), () => {
  return service.getTotalBills();
});

