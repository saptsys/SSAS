
import __BaseService from "./__BaseService";
import Models from "../../dbManager/models/index";
import rowToModelPropertyMapper from "../../dbManager/dbUtils";

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

  delete(id) {
    return this.hasItems(id).then(contains => {
      if(contains.items){
        return Promise.reject({message:"This Group Contains items so can't be deleted!"});
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
    const stmt =  this.connection.manager.createQueryBuilder(ItemMaster, "item")
    .where("item.isActive = true")
    .andWhere("item.deletedAt IS NULL")
    .andWhere("item.itemGroupMasterId = :id", { id: id })
    .select("count(item.id) as items");
    return stmt.getRawOne();
  }
}
export default ItemGroupMasterService;
