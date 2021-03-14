const promiseIpc = require("electron-promise-ipc");
const createPath = (endpoint) => "Reports/" + endpoint;
const ReportService = require("../../services/ReportService");

const service = new ReportService();

promiseIpc.on(createPath("gstr1"), (payload) => {
  return service.gstr1(payload)
});
