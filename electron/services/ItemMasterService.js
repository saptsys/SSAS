
const __BaseService = require("./__BaseService");
const Models = require("../../dbManager/models/index");
const { getConnection } = require("typeorm");
class ItemMasterService extends __BaseService {
  constructor() {
    super(Models.ItemMaster)
    this.repository = getConnection().getRepository(Models.ItemMaster)
  }
}
module.exports = ItemMasterService;
        