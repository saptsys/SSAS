
const __BaseService = require("./__BaseService");
const {SettingsMaster} = require("../../dbManager/models/SettingsMaster");
const { getConnection } = require("typeorm");
class SettingsMasterService extends __BaseService {
  constructor() {
    super(SettingsMaster)
  }

  async getSettingValue(key , relay){
    try{
      const setting = await this.repository.findOne({ where: { key: key, deletedAt: null } })
      return setting.currentValue ?? relay ?? null;
    }catch(e){
      return relay ?? null;
    }
  }

}
module.exports = SettingsMasterService;
