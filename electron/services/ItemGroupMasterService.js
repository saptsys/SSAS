
const __BaseService = require("./__BaseService");
const Models = require("../../dbManager/models/index");
class ItemGroupMasterService extends __BaseService {
  constructor() {
    super(Models.ItemGroupMaster)
  }

  /**
   *
   * @returns  Promise
   */
  getAll() {
    return this.repository.createQueryBuilder("itemGroup")
      .loadRelationCountAndMap("itemGroup.containsItems", "itemGroup.items")
      .getMany()
  }

  save(entity) {
    return super.save(entity, ["code"])
  }

}
module.exports = ItemGroupMasterService;
