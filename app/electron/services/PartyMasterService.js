
import __BaseService from "./__BaseService";
import Models from "../../dbManager/models/index";
import { getConnection } from "typeorm";
class PartyMasterService extends __BaseService {
  constructor() {
    super(Models.PartyMaster)
  }
}
export default PartyMasterService;
