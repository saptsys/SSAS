
const __BaseService = require("./__BaseService");
const Models = require("../../dbManager/models/index");
const { getConnection } = require("typeorm");
class BillsDetailService extends __BaseService {
  constructor() {
    super(Models.BillsDetail)
  }
}
module.exports = BillsDetailService;
        