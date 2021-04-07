
const __BaseService = require("./__BaseService");
const {SettingsMaster} = require("../../dbManager/models/SettingsMaster");
const { getConnection } = require("typeorm");
class SettingsMasterService extends __BaseService {
  constructor() {
    super(SettingsMaster)
  }

  async getSettingValue(key){
    try{
      const setting = await this.repository.findOne({ where: { key: key, deletedAt: null } })
      return setting.currentValue ?? null;
    }catch(e){
      return null
    }
  }

}
module.exports = SettingsMasterService;
