
const __BaseService = require("./__BaseService");
const Models = require("../../dbManager/models/index");
const { getConnection } = require("typeorm");

class DeliveryChallanService extends __BaseService {
  constructor() {
    super(Models.DeliveryTransaction)
  }
}
module.exports = DeliveryChallanService;
        