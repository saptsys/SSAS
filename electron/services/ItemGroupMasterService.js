
const __BaseService = require("./__BaseService");
const Models = require("../../dbManager/models/index");
const { getConnection } = require("typeorm");
class ItemGroupMasterService extends __BaseService {
  constructor() {
    super(Models.ItemGroupMaster)
    this.repository = getConnection().getRepository(Models.ItemGroupMaster)
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
module.exports = ItemGroupMasterService;
        