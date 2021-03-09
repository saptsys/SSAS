
const __BaseService = require("./__BaseService");
const { DeliveryTransaction } = require("../../dbManager/models/DeliveryTransaction");
const { PartyMaster } = require("../../dbManager/models/PartyMaster");
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
          "COALESCE(MAX(DeliveryChallan.challanNumber) , 0) as chalanNumber",
          "COALESCE(MAX(DeliveryChallan.voucherNumber) , 0) as voucherNumber",
        ],
      );
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
        .where("deliveryChallan.voucherNumber = :term", { term: term })
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

  getById(id) {
    return this.repository.findOneOrFail(id)
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

  getByPartyAndDate(payload) {
    try{
      const { party, date } = payload
      return this.getByPartyListAndDateInterval({
        party:[party],
        fromDate:date,
        toDate:date
      });
    }catch(e){
      console.log(e)
      return Promise.reject("Something went wrong!")
    }
  }


  getByPartyListAndDateInterval(payload) {
    try{
      const { party, fromDate , toDate } = payload
      const stmt = this.repository
      .createQueryBuilder("chalan")
      .leftJoin(PartyMaster, "party", "chalan.partyMasterId = party.id")
      .where("chalan.challanDate >= :date", { date: fromDate })
      .andWhere("chalan.challanDate <= :date", { date: toDate })
      .andWhere("chalan.partyMasterId IN :party", { party: party })
      .select([
        ...rowToModelPropertyMapper("chalan", DeliveryTransaction),
        "party.name as partyName",
      ])
      console.log(stmt.getSql())
      return stmt.getRawMany()
    }catch(e){
      console.log(e)
      return Promise.reject("Something went wrong!")
    }
  }

}
module.exports = DeliveryChallanService;
