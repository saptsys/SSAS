import __BaseService from "./__BaseService";
import Models from "../../dbManager/models/index";
import { Connection, getConnection, createConnection } from "typeorm";
class PartyMasterService extends __BaseService {

  //You can access this.repository which targets current repository.

  constructor() {
    //you need to pass current/main repository for set default repository for default base methods
    super(Models.PartyMaster)
    //define repositories which is required
  }
}


export default PartyMasterService;
