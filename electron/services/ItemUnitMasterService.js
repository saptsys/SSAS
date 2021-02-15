
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
  getAll() {
    const query =  this.repository.createQueryBuilder('itemUnit');
    query.leftJoin("ItemMaster","items","itemUnit.id = items.itemUnitMaster AND (items.isActive = true AND items.deleted_at IS NULL)")
    query.select([
      "itemUnit.*",
      "count(items.id) as containsItems"
    ]).groupBy("itemUnit.id")
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
module.exports = ItemUnitMasterService;
        