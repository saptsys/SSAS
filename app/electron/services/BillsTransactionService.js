
const __BaseService = require("./__BaseService");
const { PartyMaster } = require("../../dbManager/models/PartyMaster");
const { Not, Brackets } = require("typeorm");

const { BillsTransaction } = require("../../dbManager/models/BillsTransaction");
const { BillsDetail } = require("../../dbManager/models/BillsDetail");
const { ItemMaster } = require("../../dbManager/models/ItemMaster");
const { ItemUnitMaster } = require("../../dbManager/models/ItemUnitMaster");

const DeliveryChallanService = require("../services/DeliveryChallanService");

const rowToModelPropertyMapper = require("../../dbManager/dbUtils");
const { ALL_BILLINGS, ALL_TAGS } = require("../../Constants/Transactionals");

class BillsTransactionService extends __BaseService {
  constructor() {
    super(BillsTransaction)
    this.challanService = new DeliveryChallanService();

  }

  getTotalBillsAndLastBill(payload) {
    const tag = payload?.tag ?? ALL_TAGS
    const billing = payload?.billing ?? ALL_BILLINGS
    const stmt = this.repository.createQueryBuilder('bill')
      .where("bill.tag IN (:...tag)", { tag: tag })
      .andWhere("bill.billing IN (:...billing)", { billing: billing })
      .select([
        "COUNT(bill.billNumber) AS total",
        "COALESCE(MAX(bill.billNumber) , 0) AS billNumber",
        "COALESCE(MAX(bill.voucherNumber) , 0) AS voucherNumber",
      ])
    return stmt.getRawOne();
  }

  search(payload) {
    try {
      const term = payload.term
      const limit = payload.limit
      const tag = payload?.tag ?? ALL_TAGS
      const billing = payload?.billing ?? ALL_BILLINGS
      if (term === null || limit < 0) {
        throw "invalid limit"
      }
      if (!(tag || billing)) {
        throw "tag and billing required"
      }
      const stmt = this.repository
        .createQueryBuilder('bill')
        .leftJoin(PartyMaster, "partyMaster", "bill.partyMasterId = partyMaster.id")
        .where("bill.tag IN (:...tag)", { tag: tag })
        .andWhere("bill.billing IN (:...billing)", { billing: billing })
        .andWhere(new Brackets(sq => {
          sq.Where("bill.voucherNumber = :voucherNumber", { voucherNumber: term })
            .orWhere("bill.billNumber = :billNumber", { billNumber: term })
            .orWhere("bill.remarks = :remarks", { remarks: term })
            .orWhere("bill.netAmount = :netAmount", { netAmount: term })
            .orWhere("date(bill.billDate) = date(:billDate)", { billDate: term })
            .orWhere("partyMaster.name = :name", { name: term })
        }))
        .limit(limit)
      return stmt.getMany();
    } catch (e) {
      console.log(e)
      return Promise.resolve([])
    }
  }

  /**
   *
   * @param {Object} payload
   * @param {Array<String>} payload?.tag ?? ALL_TAGS
   * @param {Array<String>} payload?.billing ?? ALL_BILLINGS
   * @param {Array<String>} payload.billId
   */
  async getByIdWithDetails(payload) {
    // const tag = payload?.tag ?? ALL_TAGS
    // const billing = payload?.billing ?? ALL_BILLINGS
    // const billId = payload.billId
    const billId = payload
    try {
      const stmt = this.repository.createQueryBuilder("bill")
      .leftJoinAndMapMany("bill.billsDetail", BillsDetail, "detail", "bill.id = detail.billsTransactionId")
      .leftJoinAndMapOne("bill.partyMaster", PartyMaster, "party", "bill.partyMasterId = party.id")
      .leftJoinAndMapOne("detail.itemMasterId", ItemMaster, "item", "detail.itemMasterId = item.id")
      .leftJoinAndMapOne("detail.itemUnitMasterId", ItemUnitMaster, "unit", "detail.itemUnitMasterId = unit.id")
      .where("bill.id = :id", { id: billId })

      let result = await stmt.getOne();
      result.billsDetail = result.billsDetail?.map(x => {
        return {
          ...x,
          itemMaster: x.itemMasterId ? x.itemMasterId : null,
          itemMasterId: x.itemMasterId ? x.itemMasterId.id : null,
          itemUnitMaster: x.itemUnitMasterId ? x.itemUnitMasterId : null,
          itemUnitMasterId: x.itemUnitMasterId ? x.itemUnitMasterId.id : null,
        }
      })

      return result
    } catch (e) {
      console.log(e)
      return Promise.reject({ message: "Something Went Wrong!" })
    }
  }

  getAll(payload) {
    const tag = payload?.tag ?? ALL_TAGS
    const billing = payload?.billing ?? ALL_BILLINGS
    const stmt = this.repository
      .createQueryBuilder("bill")
      .leftJoin(PartyMaster, "party", "bill.partyMasterId = party.id")
      .where("bill.tag IN (:...tag)", { tag: tag })
      .andWhere("bill.billing IN (:...billing)", { billing: billing })
      .select([
        ...rowToModelPropertyMapper("bill", BillsTransaction),
        "party.name as partyName",
      ]);
    return stmt.getRawMany()
  }
  /**
   *
   * @param {Object} payload
   * @param {Integer} payload.party
   * @param {Date} payload.date
   * @returns Promise
   */
  getByPartyAndDate(payload) {
    try {
      const tag = payload?.tag ?? ALL_TAGS
      const billing = payload?.billing ?? ALL_BILLINGS
      const { party, date } = payload
      return this.getByPartyListAndDateInterval({
        party: [party],
        fromDate: date,
        toDate: date,
        tag: tag,
        billing: billing
      });
    } catch (e) {
      console.log(e)
      return Promise.reject({ message: "Something went wrong!" })
    }
  }

  /**
   *
   * @param {Object} payload
   * @param {Array} payload.party
   * @param {Date} payload.fromDate
   * @param {Date} payload.toDate
   * @returns Promise
   */
  getByPartyListAndDateInterval(payload) {
    try {
      const tag = payload?.tag ?? ALL_TAGS
      const billing = payload?.billing ?? ALL_BILLINGS
      const fromDate = payload.fromDate ?? null
      const toDate = payload.toDate ?? null
      let party = payload.party ?? [null]
      if(party && party.length == 0 ){
        party = [null]
      }
      console.log(party)
      const stmt = this.repository
        .createQueryBuilder("bill")
        .leftJoin(PartyMaster, "party", "bill.partyMasterId = party.id")
        .where("bill.tag IN (:...tag)", { tag: tag })
        .andWhere("bill.billing IN (:...billing)", { billing: billing })
        .andWhere(new Brackets(sq => {
          sq.where("( (:fromDate IS NULL) OR (date(bill.billDate) >= date(:fromDate)) )", { fromDate: fromDate })
            .andWhere("( (:toDate IS NULL) OR (date(bill.billDate) <= date(:toDate)) )", { toDate: toDate })
            .andWhere("( (COALESCE(:...party , NULL) IS NULL) OR (bill.partyMasterId IN (:...party)) )", { party: party })
        }))
        .select([
          ...rowToModelPropertyMapper("bill", BillsTransaction),
          "party.name as partyName",
        ])
      return stmt.getRawMany()
    } catch (e) {
      console.log(e)
      return Promise.reject({ message: "Something went wrong!" })
    }
  }
  /**
   *
   * @param {Object} payload
   * @param {BillsTransaction} payload.header
   * @param {Array<BillsDetail>} payload.details
   * @param {String} payload.tag
   * @param {String} payload.billing
   */

  async save(payload) {
    try {
      // let details = payload['billsDetail'];
      // delete payload['billsDetail']
      // const header = payload;

      let { header, details } = payload

      const tag = header.tag
      const billing = header.billing

      if (await this.billNumberExists(header.billNumber, header.id, tag, billing)) {
        return Promise.reject({ message: "Bill With Bill Number " + header.billNumber + " Already Exists!" })
      }

      if (await this.voucherNumberExists(header.voucherNumber, header.id, tag, billing)) {
        return Promise.reject({ message: "Bill With Voucher Number " + header.voucherNumber + " Already Exists!" })
      }

      // if (await this.chalanNumberExists(header.challanNumber, header.id, tag, billing)) {
      //   return Promise.reject({ message: "Bill With Challan Number " + header.challanNumber + " Already Exists!" })
      // }
      const runner = this.connection.createQueryRunner();

      await runner.startTransaction();

      try {
        const savedBill = await runner.manager.save(
          BillsTransaction,
          header
        )

        const billId = savedBill.id
        details = details.map(x => {
          return {
            ...x,
            billsTransactionId: billId
          }
        })

        const [deletedDetails, updatedDetails] = this.partition(details, x => x.deletedAt)

        if (updatedDetails && updatedDetails.length != 0) {
          console.log("UPDATED ", updatedDetails.length)
          await runner.manager.save(
            BillsDetail,
            updatedDetails
          )
        }

        if (deletedDetails && deletedDetails.length != 0) {
          console.log("DELETED ", deletedDetails.length)

          await runner.manager.delete(
            BillsDetail,
            deletedDetails.map(x => x.id)
          )
        }

        await runner.commitTransaction();
        await runner.release();

        return this.getByIdWithDetails(billId);
      } catch (err) {
        console.log(err)
        await runner.rollbackTransaction();
      } finally {
        await runner.release();
      }
    } catch (e) {
      console.log(e)
    }
    return Promise.reject({ message: "Something went wrong!" })
  }

  async delete(payload) {
    try {
      const headerId = payload
      const runner = this.connection.createQueryRunner();

      await runner.startTransaction();

      try {
        const entity = await this.getByIdWithDetails(headerId)
        if (!entity) {
          return Promise.reject({ message: "Bill not found!" })
        }
        const detailIds = entity['billsDetail'].map(x => x.id)
        if (detailIds && detailIds.length != 0) {
          await runner.manager.delete(
            BillsDetail,
            detailIds
          )
        }

        await runner.manager.delete(
          BillsTransaction,
          headerId
        );

        await runner.commitTransaction();
        return true;
      } catch (err) {
        console.log(err)
        await runner.rollbackTransaction();
      } finally {
        await runner.release();
      }
    } catch (e) {
      console.log(e)
      return Promise.reject({ message: "Something went wrong!" })
    }
  }

  async billNumberExists(payload, id, tag, billing) {
    let criteria = {
      billNumber: payload,
      tag: tag,
      billing: billing,
    }
    if (id && id != 0) {
      criteria.id = Not(id)
    }
    return await this.repository.count(criteria)
  }

  async voucherNumberExists(payload, id, tag, billing) {
    let criteria = {
      voucherNumber: payload,
      tag: tag,
      billing: billing,
    }
    if (id && id != 0) {
      criteria.id = Not(id)
    }
    return await this.repository.count(criteria)
  }

  async chalanNumberExists(payload, id, tag, billing) {
    let criteria = {
      challanNumber: payload,
      tag: tag,
      billing: billing,
    }
    if (id) {
      criteria.id = Not(id)
    }
    return await this.repository.count(criteria)
  }

  getChalanByPartiesAndDateInterval(payload) {
    return this.challanService.getWithDetailsByPartiesAndDate(payload)
  }

  async getByBillNumber(payload) {
    const tag = payload?.tag ?? ALL_TAGS
    const billing = payload?.billing ?? ALL_BILLINGS
    const billNumber = payload.billNumber
    if (!billNumber) {
      throw "Bill number is requried"
    }
    try {
      const stmt = this.repository.createQueryBuilder("bill")
        .leftJoinAndMapMany("bill.billsDetail", BillsDetail, "detail", "bill.id = detail.billsTransactionId")
        .leftJoinAndMapOne("bill.partyMaster", PartyMaster, "party", "bill.partyMasterId = party.id")
        .leftJoinAndMapOne("detail.itemMasterId", ItemMaster, "item", "detail.itemMasterId = item.id")
        .leftJoinAndMapOne("detail.itemUnitMasterId", ItemUnitMaster, "unit", "detail.itemUnitMasterId = unit.id")
        .where("bill.billNumber = :billNumber", { billNumber: billNumber })
        .andWhere("bill.tag IN (:...tag)", { tag: tag })
        .andWhere("bill.billing IN (:...billing)", { billing: billing })

      let result = await stmt.getOne();
      result.billsDetail = result.billsDetail?.map(x => {
        return {
          ...x,
          itemMasterName: x.itemMasterId ? x.itemMasterId.name : null,
          itemMasterId: x.itemMasterId ? x.itemMasterId.id : null,
          itemUnitMasterName: x.itemUnitMasterId ? x.itemUnitMasterId.name : null,
          itemUnitMasterId: x.itemUnitMasterId ? x.itemUnitMasterId.id : null,
        }
      })

      return result

    } catch (e) {
      console.log(e)
      return Promise.reject({ message: "Something Went Wrong!" })
    }
  }

  /**
   *
   * @param {Object} payload
   * @param {Array<String>} payload.tag
   * @param {Array<String>} payload.billing
   * @param {Array<Integer>} payload.parties
   * @param {String} payload.fromDate
   * @param {toDate} payload.toDate
   * @param {Object} payload.limit
   * @param {Integer} payload.limit.take
   * @param {Integer} payload.limit.skip
   */
  filter(payload) {
    try {
      const tag = payload?.tag ?? ALL_TAGS
      const billing = payload?.billing ?? ALL_BILLINGS
      const fromDate = payload.fromDate ?? null
      const toDate = payload.toDate ?? null
      const limit = payload.limit ?? null
      let parties = payload.parties ?? null

      if(parties && parties.length == 0 ){
        parties = null
      }

      const includeDetail = payload.includeDetail
      const includeParty = payload.includeParty;

      const stmt = this.repository.createQueryBuilder("bill")

      if (includeDetail) {
        stmt.leftJoinAndMapMany("bill.billsDetail", BillsDetail, "detail", "bill.id = detail.billsTransactionId")
      } else {
        stmt.leftJoin(BillsDetail, "detail", "bill.id = detail.billsTransactionId")
      }

      if (includeParty) {
        stmt.leftJoinAndMapOne("bill.partyMasterId", PartyMaster, "party", "bill.partyMasterId = party.id")
      } else {
        stmt.leftJoin(PartyMaster, "party", "bill.partyMasterId = party.id")
      }

      stmt.where("bill.tag IN (:...tag)", { tag: tag })
        .andWhere("bill.billing IN (:...billing)", { billing: billing })
        .andWhere("( (:fromDate IS NULL) OR (date(bill.billDate) >= date(:fromDate)) )", { fromDate: fromDate })
        .andWhere("( (:toDate IS NULL) OR (date(bill.billDate) <= date(:toDate)) )", { toDate: toDate })
        .andWhere("( (COALESCE(:...party , NULL) IS NULL) OR (bill.partyMasterId IN (:...party)) )", { party: parties })

      if (limit) {
        stmt.take(limit.take)
        stmt.skip(limit.skip)
      }

      return stmt.getMany();

    } catch (e) {

    }
  }

  partition(array, filter) {
    let pass = [], fail = [];
    array.forEach((e, idx, arr) => (filter(e, idx, arr) ? pass : fail).push(e));
    return [pass, fail];
  }

}
module.exports = BillsTransactionService;



/**

{
  CGSTAmount: 123,
  CGSTPercentage: 25,
  IGSTAmount: 45,
  IGSTPercentage: 4,
  SGSTAmount: 123,
  SGSTPercentage: 123,
  billDate: "10/02/1554",
  billNumber: 1,
  billing: "RETAIL",
  billsDetail: [{
    amount: 100,
    billsTransactionId: 1,
    createdAt: "now",
    createdBy: 0,
    deletedAt: null,
    description: "qqqq",
    id: 1,
    itemMasterId: 1,
    itemUnitMasterId: 1,
    modifiedAt: "now",
    modifiedBy: 0,
    quantity: 10,
    rate: 10,
  }],
  chalanDate: "10/02/1554",
  challanNumber: 11,
  commisionAmount: 464,
  commisionPercentage: 456,
  createdAt: "now",
  createdBy: 0,
  deletedAt: null,
  discountAmount: 123,
  discountPercentage: 123,
  dueDate: 45,
  ferightPercentage: 54,
  freightAmount: 456,
  grossAmount: 123,
  id: 1,
  modifiedAt: "now",
  modifiedBy: 0,
  netAmount: 68,
  otherAmount: 456,
  partyMasterId: 1,
  remarks: "llllllllllllllll",
  tag: "S",
  voucherNumber: 12,
}

 */
