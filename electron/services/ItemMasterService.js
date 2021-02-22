const __BaseService = require("./__BaseService");
const Models = require("../../dbManager/models/index");
const { getConnection, Repository } = require("typeorm");
const rowToModelPropertyMapper = require("../../dbManager/dbUtils");



class ItemMasterService extends __BaseService {
  constructor() {
    super(Models.ItemMaster);
  }



  // overriding to send extra fields
  getAll() {
    return this.repository
      .createQueryBuilder("item")
      .innerJoin(Models.TaxMaster, "tax", "item.taxMasterId=tax.id")
      .innerJoin(Models.ItemGroupMaster, "itemGroup", "item.itemGroupMasterId=itemGroup.id")
      .innerJoin(Models.ItemUnitMaster, "itemUnit", "item.itemUnitMasterId=itemUnit.id")
      .select([
        ...rowToModelPropertyMapper("item", Models.ItemMaster),
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
