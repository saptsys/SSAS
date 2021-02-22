
const __BaseService = require("./__BaseService");
const Models = require("../../dbManager/models/index");
const rowToModelPropertyMapper = require("../../dbManager/dbUtils");


class ItemGroupMasterService extends __BaseService {
  constructor() {
    super(Models.ItemGroupMaster)
  }

  /**
   *
   * @returns  Promise
   */
  getAll() {
    const query = this.repository.createQueryBuilder('itemGroup');
    query.leftJoin("ItemMaster", "items", "itemGroup.id = items.itemGroupMaster AND (items.isActive = true AND items.deleted_at IS NULL)")
    query.select([
      ...rowToModelPropertyMapper("itemGroup", Models.ItemGroupMaster),
      "count(items.id) as containsItems"
    ]).groupBy("itemGroup.id")
    return query.getRawMany();
  }

  save(entity) {
    return super.save(entity, ["code"])
  }

}
module.exports = ItemGroupMasterService;
