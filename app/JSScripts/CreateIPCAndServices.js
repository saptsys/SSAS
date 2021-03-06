import { resolve, join } from "path";
import glob from "glob";
import { existsSync, writeFile } from "fs";

const rootDir = resolve(__dirname, "../");

const ormconfig = require(join(rootDir, "ormconfig.js"));
const dbFolderDir = join(rootDir, ormconfig.folder)

const mainProcessPath = join(rootDir, "./electron");

glob(join(dbFolderDir, "entities/*.js"), (er, files) => {
  files.forEach((file) => {
    if (!file.includes("__BaseEntity")) {
      const entitySchema = require(file);
      const entiryName = entitySchema.options.name;

      const servicePath = join(
        mainProcessPath,
        `services/${entiryName}Service.js`
      );
      const ipcPath = join(
        mainProcessPath,
        `main-processes/ipc-calls/${entiryName}IPC.js`
      );

      if (!existsSync(servicePath)) {
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
        writeFile(servicePath, dataToWrite, (err) =>
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

      if (!existsSync(ipcPath)) {
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
        writeFile(ipcPath, dataToWrite, (err) =>
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
