
const __BaseService = require("./__BaseService");
const Models = require("../../dbManager/models/index");
const { getConnection } = require("typeorm");
class DeliveryTransactionService extends __BaseService {
  constructor() {
    super(Models.DeliveryTransaction)
  }
}
module.exports = DeliveryTransactionService;
        