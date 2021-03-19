
const __BaseService = require("./__BaseService");
const { PartyMaster } = require("../../dbManager/models/PartyMaster");
const { getConnection, In } = require("typeorm");
const AccountTypes = require("../../Constants/AccountTypes");
class PartyMasterService extends __BaseService {
  constructor() {
    super(PartyMaster)
  }

  /**
   * @param {Array.<string>} types
   * @returns  {Array.<PartyMaster>}
   */
  getAll(types) {
    return this.repository.find({ where: { type: In(types ?? AccountTypes.map(x => x.value)) } });
  }
}
module.exports = PartyMasterService;
