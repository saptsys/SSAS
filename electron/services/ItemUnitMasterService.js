
const __BaseService = require("./__BaseService");
const Models = require("../../dbManager/models/index");
const { getConnection } = require("typeorm");
const rowToModelPropertyMapper = require("../../dbManager/dbUtils");

class ItemUnitMasterService extends __BaseService {
  constructor() {
    super(Models.ItemUnitMaster)
  }

  /**
   *
   * @returns  Promise
   */
  getAll() {
    const query =  this.repository.createQueryBuilder('itemUnit');
    query.leftJoin("ItemMaster","items","itemUnit.id = items.itemUnitMaster AND (items.isActive = true AND items.deleted_at IS NULL)")
    query.select([
      ...rowToModelPropertyMapper("itemUnit", Models.ItemUnitMaster),
      "count(items.id) as containsItems"
    ]).groupBy("itemUnit.id")
    return query.getRawMany();
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
