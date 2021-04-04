const promiseIpc = require("electron-promise-ipc");
const {ImportFromGayatri} = require("../../services/ImportFromGayatri");
// const { webContents } = require("electron");
// const { reverseIpc } = require("./../ReverseIPC")
const dialog = require('electron').dialog;

const createPath = (endpoint) => "ImportExternal/" + endpoint;

const gayatriService = new ImportFromGayatri();

promiseIpc.on(createPath("fromGayatri"), (payload) => {
  return gayatriService.importAndInsert(payload);
});

promiseIpc.on(createPath("selectFolder"), () => {
  return dialog.showOpenDialog({properties: ['openDirectory']})
});


