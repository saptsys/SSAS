
const __BaseService = require("./__BaseService");
const Models = require("../../dbManager/models/index");
const { getConnection } = require("typeorm");
class PartyMasterService extends __BaseService {
  constructor() {
    super(Models.PartyMaster)
  }
}
module.exports = PartyMasterService;
        