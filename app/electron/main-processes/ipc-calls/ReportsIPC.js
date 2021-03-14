const promiseIpc = require("electron-promise-ipc");
const createPath = (endpoint) => "Reports/" + endpoint;
const ReportService = require("../../services/ReportService");

const service = new ReportService();

promiseIpc.on(createPath("gst1"), (payload) => {
  return service.gst1(payload)
});
