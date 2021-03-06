import __BaseService from "./__BaseService";
import Models from "../../dbManager/models/index";
import { getConnection, Repository } from "typeorm";
import rowToModelPropertyMapper from "../../dbManager/dbUtils";



class ItemMasterService extends __BaseService {
  constructor() {
    super(Models.ItemMaster);
  }



  // overriding to send extra fields
  getAll() {
    return this.repository
      .createQueryBuilder("item")
      .leftJoin(Models.TaxMaster, "tax", "item.taxMasterId=tax.id")
      .leftJoin(Models.ItemGroupMaster, "itemGroup", "item.itemGroupMasterId=itemGroup.id")
      .leftJoin(Models.ItemUnitMaster, "itemUnit", "item.itemUnitMasterId=itemUnit.id")
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
export default ItemMasterService;
