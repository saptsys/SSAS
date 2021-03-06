const path = require("path");
const glob = require("glob");
const fs = require("fs");

const rootDir = path.resolve(__dirname, "../");

const ormconfig = require(path.join(rootDir, "ormconfig.js"));
const dbFolderDir = path.join(rootDir, ormconfig.folder)

const mainProcessPath = path.join(rootDir, "./electron");

glob(path.join(dbFolderDir, "entities/*.js"), (er, files) => {
  files.forEach((file) => {
    if (!file.includes("__BaseEntity")) {
      const entitySchema = require(file);
      const entiryName = entitySchema.options.name;

      const servicePath = path.join(
        mainProcessPath,
        `services/${entiryName}Service.js`
      );
      const ipcPath = path.join(
        mainProcessPath,
        `main-processes/ipc-calls/${entiryName}IPC.js`
      );

      if (!fs.existsSync(servicePath)) {
        const dataToWrite = `
const __BaseService = require("./__BaseService");
const Models = require("../../dbManager/models/index");
const { getConnection } = require("typeorm");
class ${entiryName}Service extends __BaseService {
  constructor() {
    super(Models.${entiryName})
    this.repository = getConnection().getRepository(Models.${entiryName})
  }
}
module.exports = ${entiryName}Service;
        `;
        fs.writeFile(servicePath, dataToWrite, (err) =>
          err
            ? console.error(err)
            : console.log(
                `\n\n====> Service '${entiryName}' CREATED <====\n${servicePath}`
              )
        );
      } else {
        console.log(
          `====> Service '${entiryName}' ALREADY EXIST <====\n`
        );
      }

      if (!fs.existsSync(ipcPath)) {
        const dataToWrite = `
const promiseIpc = require("electron-promise-ipc");
const ${entiryName}Service = require("../../services/${entiryName}Service");
const createPath = (endpoint) => "${entiryName}/" + endpoint;

const service = new ${entiryName}Service();

promiseIpc.on(createPath("getAll"), () => {
  return service.getAll();
});

promiseIpc.on(createPath("save"), (payload) => {
  return service.save(payload);
});

promiseIpc.on(createPath("getById"), (payload) => {
  return service.getById(payload);
});
        `;
        fs.writeFile(ipcPath, dataToWrite, (err) =>
          err
            ? console.error(err)
            : console.log(
                `\n\n====> Ipc '${entiryName}' CREATED <====\n${servicePath}`
              )
        );
      } else {
        console.log(
          `====> IPC '${entiryName}' ALREADY EXIST <====\n`
        );
      }
    }
  });
});
