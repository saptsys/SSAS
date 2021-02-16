
const __BaseService = require("./__BaseService");
const Models = require("../../dbManager/models/index");
const { getConnection } = require("typeorm");
class ItemGroupMasterService extends __BaseService {
  constructor() {
    super(Models.ItemGroupMaster)
  }
  
  /**
   *
   * @returns  Promise
   */
  getAll() {
    const query =  this.repository.createQueryBuilder('itemGroup');
    query.leftJoin("ItemMaster","items","itemGroup.id = items.itemGroupMaster AND (items.isActive = true AND items.deleted_at IS NULL)")
    query.select([
      "itemGroup.*",
      "count(items.id) as containsItems"
    ]).groupBy("itemGroup.id")
    return query.getRawMany();
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
        