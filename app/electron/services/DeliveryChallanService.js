
const __BaseService = require("./__BaseService");
const {DeliveryTransaction} = require("../../dbManager/models/DeliveryTransaction");
const { getConnection } = require("typeorm");

class DeliveryChallanService extends __BaseService {
  constructor() {
    super(DeliveryTransaction)
  }
}
module.exports = DeliveryChallanService;
