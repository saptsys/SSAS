const __BaseService = require("./__BaseService");
const {ItemMaster} = require("../../dbManager/models/ItemMaster");
const { getConnection, Repository } = require("typeorm");
const rowToModelPropertyMapper = require("../../dbManager/dbUtils");



class ItemMasterService extends __BaseService {
  constructor() {
    super(ItemMaster);
  }



  // overriding to send extra fields
  getAll() {
    return this.repository
      .createQueryBuilder("item")
      .leftJoin(Models.TaxMaster, "tax", "item.taxMasterId=tax.id")
      .leftJoin(Models.ItemGroupMaster, "itemGroup", "item.itemGroupMasterId=itemGroup.id")
      .leftJoin(Models.ItemUnitMaster, "itemUnit", "item.itemUnitMasterId=itemUnit.id")
      .select([
        ...rowToModelPropertyMapper("item", ItemMaster),
        "tax.name as taxMasterName",
        "itemGroup.name as itemGroupMasterName",
        "itemUnit.name as itemUnitMasterName",
      ]).getRawMany()
  }

  save(entity) {
    return super.save(entity, ["code"]);
  }
}
module.exports = ItemMasterService;
