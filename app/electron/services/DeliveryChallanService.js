
import __BaseService from "./__BaseService";
import Models from "../../dbManager/models/index";
import { getConnection } from "typeorm";

class DeliveryChallanService extends __BaseService {
  constructor() {
    super(Models.DeliveryTransaction)
  }
}
export default DeliveryChallanService;
