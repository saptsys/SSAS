const promiseIpc = require("electron-promise-ipc");
const PartyMasterService = require("../../services/PartyMasterSevice");
// const { webContents } = require("electron");
const {reverseIpc} = require("./../ReverseIPC")
const createPath = (endpoint) => "PartyMaster/" + endpoint;

const service = new PartyMasterService();

promiseIpc.on(createPath("getAll"), () => {
  return service.getAll();
});

promiseIpc.on(createPath("save"), (payload) => {
  reverseIpc
    .dispatchToFocusedWindow("showAlert", { title: "hello" })
    .then(console.log)
    .catch(console.log);
    
  return service.save(payload);
});

promiseIpc.on(createPath("getById"), (payload) => {
  return service.getById(payload);
});
