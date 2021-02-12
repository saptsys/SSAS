
const __BaseService = require("./__BaseService");
const Models = require("../../dbManager/models/index");
const { getConnection } = require("typeorm");
class DeliveryTransactionService extends __BaseService {
  constructor() {
    super(Models.DeliveryTransaction)
    this.repository = getConnection().getRepository(Models.DeliveryTransaction)
  }
}
module.exports = DeliveryTransactionService;
        