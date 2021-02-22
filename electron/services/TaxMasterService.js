
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

}
module.exports = TaxMasterService;
