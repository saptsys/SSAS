
const __BaseService = require("./__BaseService");
const {BillsDetail} = require("../../dbManager/models/BillsDetail");
const { getConnection } = require("typeorm");
class BillsDetailService extends __BaseService {
  constructor() {
    super(BillsDetail)
  }
}
module.exports = BillsDetailService;
