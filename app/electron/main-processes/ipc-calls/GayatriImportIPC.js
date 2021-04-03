const promiseIpc = require("electron-promise-ipc");
const {ImportFromGayatri} = require("../../services/ImportFromGayatri");
// const { webContents } = require("electron");
// const { reverseIpc } = require("./../ReverseIPC")
const createPath = (endpoint) => "GayatriImport/" + endpoint;

const service = new ImportFromGayatri();

promiseIpc.on(createPath("importAndInsert"), (payload) => {
  return service.importAndInsert(payload);
});

