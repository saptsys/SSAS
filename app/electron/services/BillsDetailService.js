
import __BaseService from "./__BaseService";
import Models from "../../dbManager/models/index";
class BillsDetailService extends __BaseService {
  constructor() {
    super(Models.BillsDetail)
  }
}
export default BillsDetailService;
