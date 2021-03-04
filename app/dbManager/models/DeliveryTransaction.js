const _BaseModel = require("./_BaseModel");

class DeliveryTransaction extends _BaseModel {
  constructor({
    id,
    createdAt,
    createdBy,
    modifiedAt,
    modifiedBy,
    voucherNumber,
    challanNumber,
    challanDateDate,
    grossAmount,
    netAmount,
    remarks,
    partyMasterId,
    ...rest
  } = {}) {
    super(rest), (this.id = id);
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.modifiedAt = modifiedAt;
    this.modifiedBy = modifiedBy;
    this.voucherNumber = voucherNumber;
    this.challanNumber = challanNumber;
    this.challanDateDate = challanDateDate;
    this.grossAmount = grossAmount;
    this.netAmount = netAmount;
    this.remarks = remarks;
    this.partyMasterId = partyMasterId;
  }
}
module.exports = DeliveryTransaction;
