
const __BaseService = require("./__BaseService");
const {BillsTransaction} = require("../../dbManager/models/BillsTransaction");
class BillsTransactionService extends __BaseService {
  constructor() {
    super(BillsTransaction)
  }
}
module.exports = BillsTransactionService;
