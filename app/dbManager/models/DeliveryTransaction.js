const { _BaseModel } = require("./_BaseModel");

class DeliveryTransaction extends _BaseModel {
  constructor({
    id,
    createdAt,
    createdBy,
    modifiedAt,
    modifiedBy,
    voucherNumber,
    challanNumber,
    challanDate,
    grossAmount,
    netAmount,
    remarks,
    partyMasterId,
    deliveryDetails,
    deliveryAddress,
    previousDue,
    ...rest
  } = {}) {
    super(rest), (this.id = id);
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.modifiedAt = modifiedAt;
    this.modifiedBy = modifiedBy;
    this.voucherNumber = voucherNumber;
    this.challanNumber = challanNumber;
    this.challanDate = challanDate;
    this.grossAmount = grossAmount;
    this.netAmount = netAmount;
    this.remarks = remarks;
    this.partyMasterId = partyMasterId;
    this.deliveryDetails = deliveryDetails;
    this.previousDue = previousDue;
    this.deliveryAddress = deliveryAddress;
  }
}
module.exports = { DeliveryTransaction: DeliveryTransaction };
