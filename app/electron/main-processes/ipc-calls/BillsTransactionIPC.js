
const promiseIpc = require("electron-promise-ipc");
const BillsTransactionService = require("../../services/BillsTransactionService");
const createPath = (endpoint) => "BillsTransaction/" + endpoint;

const service = new BillsTransactionService();


promiseIpc.on(createPath("getAll"), (payload) => {
  return service.getAll(payload);
});

promiseIpc.on(createPath("save"), (payload) => {
  return service.save(payload);
});

promiseIpc.on(createPath("update"), (payload) => {
  return service.save(payload);
});

promiseIpc.on(createPath("getByIdWithDetails"), (payload) => {
  return service.getByIdWithDetails(payload);
});

promiseIpc.on(createPath("delete"), (payload) => {
  return service.delete(payload);
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

promiseIpc.on(createPath("getByBillNumber"), (payload) => {
  return service.getByBillNumber(payload);
});

promiseIpc.on(createPath("getChalanByPartiesAndDateInterval"), (payload) => {
  return service.getChalanByPartiesAndDateInterval(payload);
});

promiseIpc.on(createPath("getTotalBillsAndLastBill"), (payload) => {
  return service.getTotalBillsAndLastBill(payload);
});

