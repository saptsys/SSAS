
const __BaseService = require("./__BaseService");
const {ItemUnitMaster} = require("../../dbManager/models/ItemUnitMaster");
const { getConnection } = require("typeorm");
const rowToModelPropertyMapper = require("../../dbManager/dbUtils");

class ItemUnitMasterService extends __BaseService {
  constructor() {
    super(ItemUnitMaster)
  }

  /**
   *
   * @returns  Promise
   */
  getAll() {
    const query =  this.repository.createQueryBuilder('itemUnit');
    query.leftJoin("ItemMaster","items","itemUnit.id = items.itemUnitMaster AND (items.isActive = true AND items.deleted_at IS NULL)")
    query.select([
      ...rowToModelPropertyMapper("itemUnit", ItemUnitMaster),
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

  delete(id) {
    return this.hasItems(id).then(contains => {
      if(contains.items){
        return Promise.reject({message:"This Unit Contains items so can't be deleted!"});
      }else{
        return super.delete(id);
      }
    })
  }

  /**
   *
   * @param {Integer} id
   * @returns {Promise}
   */
  hasItems(id){
    const stmt =  this.connection.manager.createQueryBuilder(Models.ItemMaster, "item")
    .where("item.isActive = true")
    .andWhere("item.deletedAt IS NULL")
    .andWhere("item.itemUnitMasterId = :id", { id: id })
    .select("count(item.id) as items");
    return stmt.getRawOne();
  }
}
module.exports = ItemUnitMasterService;
