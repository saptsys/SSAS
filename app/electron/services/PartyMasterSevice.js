const __BaseService = require("./__BaseService");
const Models = require("../../dbManager/models/index");
const { Connection, getConnection, createConnection } = require("typeorm");
class PartyMasterService extends __BaseService {

  //You can access this.repository which targets current repository.

  constructor() {
    //you need to pass current/main repository for set default repository for default base methods
    super(Models.PartyMaster)
    //define repositories which is required
  }
}


module.exports = PartyMasterService;
