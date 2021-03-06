import promiseIpc  from "electron-promise-ipc";
import PartyMasterService from "../../services/PartyMasterSevice";
// const { webContents } = require("electron");
import { reverseIpc } from "./../ReverseIPC";
const createPath = (endpoint) => "PartyMaster/" + endpoint;

const service = new PartyMasterService();

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
