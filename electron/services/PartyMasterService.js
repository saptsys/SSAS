
const __BaseService = require("./__BaseService");
const Models = require("../../dbManager/models/index");
const { getConnection } = require("typeorm");
class PartyMasterService extends __BaseService {
  constructor() {
    super(Models.PartyMaster)
    this.repository = getConnection().getRepository(Models.PartyMaster)
  }
}
module.exports = PartyMasterService;
        