const { getConnection } = require("typeorm");
const moment = require("moment")
const { dateFormat } = require("./../../Constants/Formats")
const models = require("./../../dbManager/models/")
class DashboardService {
  constructor() {

  }

  async getStats(date) {
    if (date == null) {
      date = moment().toISOString()
    }
    console.log(date)
    const chalanStmt = getConnection()
      .getRepository(models.DeliveryTransaction)
      .createQueryBuilder("chalan")
      .where("chalan.challanDate = date(:chalanDate)", { "chalanDate": date })
      .select(["count(chalan.id) as count", "sum(chalan.netAmount) as value"])

    const chalanValue = await chalanStmt.getRawOne();

    const salesStmt = getConnection()
      .getRepository(models.BillsTransaction)
      .createQueryBuilder("bills")
      .where("bills.billDate = date(:billDate)", { "billDate": date })
      .andWhere("bills.tag = :tag", { tag: "S" })
      .select(["count(bills.id) as count", "sum(bills.netAmount) as value"])

    const salesValue = await salesStmt.getRawOne();


    const purchaseStmt = getConnection()
      .getRepository(models.BillsTransaction)
      .createQueryBuilder("bills")
      .where("bills.billDate = date(:billDate)", { "billDate": date })
      .andWhere("bills.tag = :tag", { tag: "P" })
      .select(["count(bills.id) as count", "sum(bills.netAmount) as value"])

    const purchaseValue = await purchaseStmt.getRawOne();

    return {
      chalan: {
        count: chalanValue.count ?? 0,
        value: chalanValue.value ?? 0
      },
      sales: {
        count: salesValue.count ?? 0,
        value: salesValue.value ?? 0
      },
      purchase: {
        count: purchaseValue.count ?? 0,
        value: purchaseValue.value ?? 0
      },
    }

  }
}

module.exports = DashboardService;

