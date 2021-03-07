
const __BaseService = require("./__BaseService");
const {SettingsMaster} = require("../../dbManager/models/SettingsMaster");
const { getConnection } = require("typeorm");
class SettingsMasterService extends __BaseService {
  constructor() {
    super(SettingsMaster)
  }

}
module.exports = SettingsMasterService;
