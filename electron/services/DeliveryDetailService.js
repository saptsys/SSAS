
const __BaseService = require("./__BaseService");
const Models = require("../../dbManager/models/index");
const { getConnection } = require("typeorm");
class DeliveryDetailService extends __BaseService {
  constructor() {
    super(Models.DeliveryDetail)
  }
}
module.exports = DeliveryDetailService;
        