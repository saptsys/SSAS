
import __BaseService from "./__BaseService";
import Models from "../../dbManager/models/index";
import { getConnection } from "typeorm";
class BillsTransactionService extends __BaseService {
  constructor() {
    super(Models.BillsTransaction)
  }
}
export default BillsTransactionService;
