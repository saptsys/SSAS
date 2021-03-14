const { Models } = require("../../dbManager/models/index");
const { getConnection } = require("typeorm");
const BillsTransactionService = require("./BillsTransactionService")
const {GSTR1} = require("./Reports/GSTR1/GSTR1")

const billService = new BillsTransactionService();
const gstr1Report = new GSTR1();

class ReportService {
  constructor() {

  }

  async gstr1(payload) {
    const fromDate = payload.fromDate
    const toDate = payload.toDate
    const bills = await billService.filter({
      fromDate:fromDate,
      toDate:toDate,
      tag:["S" , "SR"],
      billing:["GST" , "RETAIL"],
      includeDetail: false,
      includeParty:true,
    });

    gstr1Report.setBills(bills);

    return gstr1Report.getReport();

  }

}
module.exports = ReportService;
