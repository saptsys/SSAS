
const promiseIpc = require("electron-promise-ipc");
const DashboardService = require("../../services/DashboardService");
const createPath = (endpoint) => "Dashboard/" + endpoint;

const service = new DashboardService();

promiseIpc.on(createPath("getStats"), () => {
  return service.getStats();
});
