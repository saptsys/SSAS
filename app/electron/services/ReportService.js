const { Models } = require("../../dbManager/models/index");
const { getConnection } = require("typeorm");
const BillsTransactionService = require("./BillsTransactionService")
const {GST1} = require("./Reports/GST1")

const billService = new BillsTransactionService();
const gst1Report = new GST1();

class ReportService {
  constructor() {

  }

  async gst1(payload) {
    const fromDate = payload.fromDate
    const toDate = payload.toDate
    const bills = await billService.filter({
      fromDate:fromDate,
      toDate:toDate,
      tag:["S"],
      billing:["GST"],
      includeDetail: false,
      includeParty:true,
    });

    gst1Report.setBills(bills);

    return gst1Report.getReport();

  }

}
module.exports = ReportService;
