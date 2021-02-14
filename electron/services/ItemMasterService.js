const __BaseService = require("./__BaseService");
const Models = require("../../dbManager/models/index");
const { getConnection, Repository } = require("typeorm");
class ItemMasterService extends __BaseService {
  constructor() {
    super(Models.ItemMaster);
    /**
     * @instance Repository
     */
    this.repository = getConnection().getRepository(Models.ItemMaster);
  }
  // overriding to send extra fields
  getAll() {
    const stmt = this.repository
      .createQueryBuilder("item")
      .leftJoin("item.itemUnitMaster", "units")
      .leftJoin("item.itemGroupMaster", "groups")
      .leftJoin("item.taxMaster", "taxes")

      .select([
        "item.*",
        "units.name as itemUnitMasterName",
        "groups.name as itemGroupMasterName",
        "taxes.name as taxMasterName",
      ]);
    return stmt.getRawMany();
  }
}
module.exports = ItemMasterService;
