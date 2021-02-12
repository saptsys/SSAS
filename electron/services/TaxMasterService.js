
const __BaseService = require("./__BaseService");
const Models = require("../../dbManager/models/index");
const { getConnection } = require("typeorm");
class TaxMasterService extends __BaseService {
  constructor() {
    super(Models.TaxMaster)
    this.repository = getConnection().getRepository(Models.TaxMaster)
  }
}
module.exports = TaxMasterService;
        