
import __BaseService from "./__BaseService";
import Models from "../../dbManager/models/index";
import { getConnection } from "typeorm";
class SettingsMasterService extends __BaseService {
  constructor() {
    super(Models.SettingsMaster)
  }

}
export default SettingsMasterService;
