
const __BaseService = require("./__BaseService");
const { DeliveryTransaction } = require("../../dbManager/models/DeliveryTransaction");
const { PartyMaster } = require("../../dbManager/models/PartyMaster");
const { DeliveryDetail } = require("../../dbManager/models/DeliveryDetail");
const { ItemMaster } = require("../../dbManager/models/ItemMaster");
const { ItemGroupMaster } = require("../../dbManager/models/ItemGroupMaster");
const { ItemUnitMaster } = require("../../dbManager/models/ItemUnitMaster");
const { TaxMaster } = require("../../dbManager/models/TaxMaster");
const { Not } = require("typeorm");

const rowToModelPropertyMapper = require("../../dbManager/dbUtils");

class DeliveryChallanService extends __BaseService {
  constructor() {
    super(DeliveryTransaction)
  }

  getLastChalanAndVoucherNumber() {
    const stmt = this.repository
      .createQueryBuilder('DeliveryChallan')
      .select(
        [
          "COALESCE(MAX(DeliveryChallan.challanNumber) , 0) as challanNumber",
          "COALESCE(MAX(DeliveryChallan.voucherNumber) , 0) as voucherNumber",
        ],
      );
    return stmt.getRawOne();
  }

  getTotalBills() {
    const stmt = this.repository.createQueryBuilder('DeliveryChallan')
      .select([
        "count(DeliveryChallan.challanNumber) as total"
      ])
    return stmt.getRawOne();
  }

  search(payload) {
    try {
      const term = payload.term
      const limit = payload.limit
      if (term === null || limit < 0) {
        throw "invalid limit"
      }
      const stmt = this.repository
        .createQueryBuilder('deliveryChallan')
        .leftJoin(PartyMaster, "partyMaster", "deliveryChallan.partyMasterId = partyMaster.id")
        .orWhere("deliveryChallan.voucherNumber = :term", { term: term })
        .orWhere("deliveryChallan.challanNumber = :term", { term: term })
        .orWhere("deliveryChallan.challanDate = :term", { term: term })
        .orWhere("deliveryChallan.grossAmount = :term", { term: term })
        .orWhere("deliveryChallan.netAmount = :term", { term: term })
        .orWhere("deliveryChallan.remarks = :term", { term: term })
        .orWhere("partyMaster.name = :term", { term: term })
        .limit(limit)
      return stmt.getMany();
    } catch (e) {
      console.log(e)
      return Promise.resolve([])
    }
  }

  getDetailsById(id) {
    try {
      const stmt = this.repository.createQueryBuilder("chalan")
        .leftJoin(DeliveryDetail, "detail", "chalan.id = detail.deliveryTransactionId")
        .leftJoin(ItemMaster, "item", "detail.itemMasterId = item.id")
        .leftJoin(ItemUnitMaster, "unit", "detail.itemUnitMasterId = unit.id")
        .where("detail.deliveryTransactionId = :id", { id: id })
        .select([
          ...rowToModelPropertyMapper("detail", DeliveryDetail),
          "unit.name as unitName",
          "item.name as itemName",
        ])
      return stmt.getRawMany();
    } catch (e) {
      console.log(e)
      return Promise.reject("Something Went Wrong!")
    }
  }

  getByIdWithDetails(trxId) {
    try {
      return this.repository.createQueryBuilder("chalan")
      .leftJoinAndMapMany("chalan.deliveryDetails", DeliveryDetail, "detail", "chalan.id = detail.deliveryTransactionId")
      .where("chalan.id = :id", { id: trxId })
      .getOne();
    } catch (e) {
      console.log(e)
      return Promise.reject("Something Went Wrong!")
    }
  }

  getAll() {
    return this.repository
      .createQueryBuilder("chalan")
      .leftJoin(PartyMaster, "party", "chalan.partyMasterId = party.id")
      .select([
        ...rowToModelPropertyMapper("chalan", DeliveryTransaction),
        "party.name as partyName",
      ]).getRawMany()
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
      const { party, date } = payload
      return this.getByPartyListAndDateInterval({
        party: [party],
        fromDate: date,
        toDate: date
      });
    } catch (e) {
      console.log(e)
      return Promise.reject("Something went wrong!")
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
      const { party, fromDate, toDate } = payload
      const stmt = this.repository
        .createQueryBuilder("chalan")
        .leftJoin(PartyMaster, "party", "chalan.partyMasterId = party.id")
        .andWhere("( (:fromDate IS NULL) OR (chalan.challanDate >= :fromDate) )", { fromDate: fromDate })
        .andWhere("( (:toDate IS NULL) OR (chalan.challanDate <= :toDate) )", { toDate: toDate })
        .andWhere("( (COALESCE(:party , NULL) IS NULL) OR (chalan.partyMasterId IN (:...party)) )", { party: party })
        .select([
          ...rowToModelPropertyMapper("chalan", DeliveryTransaction),
          "party.name as partyName",
        ])
      return stmt.getRawMany()
    } catch (e) {
      console.log(e)
      return Promise.reject("Something went wrong!")
    }
  }
  /**
   *
   * @param {Object} payload
   * @param {DeliveryTransaction} payload.header
   * @param {Array<DeliveryDetail>} payload.details
   */
  async save(payload) {
    try {
      let details = payload['deliveryDetails'];
      delete payload['deliveryDetails']
      const header = payload;
      if (await this.voucherNumberExists(header.voucherNumber, header.id)) {
        return Promise.reject("Challan With Voucher Number " + header.voucherNumber + " Already Exists!")
      }
      if (await this.chalanNumberExists(header.challanNumber, header.id)) {
        return Promise.reject("Challan With Challan Number " + header.challanNumber + " Already Exists!")
      }
      const runner = this.connection.createQueryRunner();

      await runner.startTransaction();

      try {
        const savedChalan = await runner.manager.save(
          DeliveryTransaction,
          header
        )

        const chalanId = savedChalan.id
        details = details.map(x => {
          return {
            ...x,
            deliveryTransactionId: chalanId
          }
        })

        const [deletedDetails , updatedDetails] = this.partition(details , x => x.deletedAt)

        if(updatedDetails && updatedDetails.length != 0){
          await runner.manager.save(
            DeliveryDetail,
            updatedDetails
          )
        }

        if(deletedDetails && deletedDetails.length != 0){
          await runner.manager.delete(
            DeliveryDetail,
            deletedDetails.map(x => x.id)
          )
        }

        await runner.commitTransaction();
        await runner.release();

        return this.getByIdWithDetails(chalanId);
      } catch (err) {
        console.log(err)
        await runner.rollbackTransaction();
      } finally {
        await runner.release();
      }
    } catch (e) {
      console.log(e)
    }
    return Promise.reject("Something went wrong!")
  }

  async delete(payload) {
    try {
      const headerId = payload
      const runner = this.connection.createQueryRunner();

      await runner.startTransaction();

      try {
        const entity = await this.getByIdWithDetails(headerId)
        const detailIds = entity['deliveryDetails'].map(x => x.id)
        await runner.manager.delete(
          DeliveryDetail,
          detailIds
        )
        await runner.manager.delete(
          DeliveryTransaction,
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
      return Promise.reject("Something went wrong!")
    }
  }

  async voucherNumberExists(payload, id) {
    let criteria = {
      voucherNumber: payload
    }
    if (id && id != 0) {
      criteria.id = Not(id)
    }
    return await this.repository.count(criteria)
  }

  async chalanNumberExists(payload, id) {
    let criteria = {
      challanNumber: payload
    }
    if (id) {
      criteria.id = Not(id)
    }
    return await this.repository.count(criteria)
  }

  partition(array, filter) {
    let pass = [], fail = [];
    array.forEach((e, idx, arr) => (filter(e, idx, arr) ? pass : fail).push(e));
    return [pass, fail];
  }
}
module.exports = DeliveryChallanService;



