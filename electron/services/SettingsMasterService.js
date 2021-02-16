
const __BaseService = require("./__BaseService");
const Models = require("../../dbManager/models/index");
const { getConnection } = require("typeorm");
class SettingsMasterService extends __BaseService {
  constructor() {
    super(Models.SettingsMaster)
  }
}
module.exports = SettingsMasterService;
        