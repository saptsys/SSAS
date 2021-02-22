
const __BaseService = require("./__BaseService");
const Models = require("../../dbManager/models/index");
const rowToModelPropertyMapper = require("../../dbManager/dbUtils");

class TaxMasterService extends __BaseService {
  constructor() {
    super(Models.TaxMaster)
  }

  /**
   *
   * @returns  Promise
   */
  getAll() {
    const query =  this.repository.createQueryBuilder('tax');
    query.leftJoin("ItemMaster","items","tax.id = items.taxMaster AND (items.isActive = true AND items.deleted_at IS NULL)")
    query.select([
      ...rowToModelPropertyMapper("tax", Models.TaxMaster),
      "count(items.id) as containsItems"
    ]).groupBy("tax.id")
    return query.getRawMany();
  }

  save(entity) {
    return super.save(entity, ["code"]);
  }

  delete(id) {
    this.hasItems(id).then(console.log).catch(console.log)
    return this.hasItems(id).then(contains => {
      if(contains.items){
        return Promise.reject({message:"This Tax Contains items so can't be deleted!"});
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
    .andWhere("item.taxMasterId = :id", { id: id })
    .select("count(item.id) as items");
    return stmt.getRawOne();
  }
}
module.exports = TaxMasterService;
