
const __BaseService = require("./__BaseService");
const {PartyMaster} = require("../../dbManager/models/PartyMaster");
const { getConnection } = require("typeorm");
class PartyMasterService extends __BaseService {
  constructor() {
    super(PartyMaster)
  }
}
module.exports = PartyMasterService;
