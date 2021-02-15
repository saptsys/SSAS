
const __BaseService = require("./__BaseService");
const Models = require("../../dbManager/models/index");
const { getConnection } = require("typeorm");
class ItemUnitMasterService extends __BaseService {
  constructor() {
    super(Models.ItemUnitMaster)
    this.repository = getConnection().getRepository(Models.ItemUnitMaster)
  }
  
  /**
   *
   * @returns  Promise
   */
  save(entity) {
    return super.save(entity , true);
  }

  /**
   *
   * @returns  Promise
   */
  update(entity) {
    return super.update(entity , true);
  }
}
module.exports = ItemUnitMasterService;
        