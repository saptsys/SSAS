const promiseIpc = require("electron-promise-ipc");
const PartyMasterService = require("../../services/PartyMasterSevice");

const createPath = (endpoint) => "PartyMaster/" + endpoint;

const service = new PartyMasterService();

promiseIpc.on(createPath("getAll"), () => {
  console.log(createPath("getAll requirest recieved"))
  return service.getAll();
});

promiseIpc.on(createPath("save"), (payload) => {
  return service.save(payload);
});
