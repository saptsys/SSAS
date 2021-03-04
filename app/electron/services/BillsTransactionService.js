
const __BaseService = require("./__BaseService");
const Models = require("../../dbManager/models/index");
const { getConnection } = require("typeorm");
class BillsTransactionService extends __BaseService {
  constructor() {
    super(Models.BillsTransaction)
  }
}
module.exports = BillsTransactionService;
        