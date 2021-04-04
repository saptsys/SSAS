const promiseIpc = require("electron-promise-ipc");
const { FirmInfoService } = require("../../services/FirmInfoService");

const createPath = (endpoint) => "FirmInfo/" + endpoint;

const service = new FirmInfoService();

promiseIpc.on(createPath("getData"), () => {
  return new Promise((resolve, reject) => {
    try {
      const data = service.getData()
      resolve(data)
    } catch (e) {
      reject(e)
    }
  })
});
promiseIpc.on(createPath("getAllFirms"), () => {
  return new Promise((resolve, reject) => {
    try {
      const data = service.getAllFirms()
      resolve(data)
    } catch (e) {
      reject(e)
    }
  })
});
promiseIpc.on(createPath("getAllDB"), () => {
  return new Promise((resolve, reject) => {
    try {
      const data = service.getAllDB()
      resolve(data)
    } catch (e) {
      reject(e)
    }
  })
});

promiseIpc.on(createPath("openNew"), () => {
  service.openNewDialog()
});

promiseIpc.on(createPath("save"), (payload) => {
  return service.save(payload)
});

promiseIpc.on(createPath("updateFirm"), (payload) => {
  return service.updateFirm(payload)
});

promiseIpc.on(createPath("openValidationDialog"), (type) => {
  return service.openInvalidSoftwareDialog(type)
});

