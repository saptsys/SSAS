
const __BaseService = require("./__BaseService");
const Models = require("../../dbManager/models/index");
const { getConnection } = require("typeorm");
class TaxMasterService extends __BaseService {
  constructor() {
    super(Models.TaxMaster)
    this.repository = getConnection().getRepository(Models.TaxMaster)
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
module.exports = TaxMasterService;
        