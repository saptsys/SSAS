
const __BaseService = require("./__BaseService");
const Models = require("../../dbManager/models/index");
const { getConnection } = require("typeorm");
class ItemUnitMasterService extends __BaseService {
  constructor() {
    super(Models.ItemUnitMaster)
  }

  /**
   *
   * @returns  Promise
   */
  getAll() {
    return this.repository.createQueryBuilder("itemUnit")
      .loadRelationCountAndMap("itemUnit.containsItems", "itemUnit.items")
      .getMany()
  }
  /**
   *
   * @returns  Promise
   */
  save(entity) {
    return super.save(entity, ["code"]);
  }

}
module.exports = ItemUnitMasterService;
