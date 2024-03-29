const { _BaseModel } = require("./_BaseModel");

class BillsDetail extends _BaseModel {
  constructor({
    id,
    createdAt,
    createdBy,
    modifiedAt,
    modifiedBy,
    description,
    quantity,
    rate,
    amount,
    billsTransactionId,
    itemMasterId,
    itemUnitMasterId,
    assessableAmount,
    otherPercentage,
    otherAmount,
    SGSTPercentage,
    SGSTAmount,
    CGSTPercentage,
    CGSTAmount,
    IGSTPercentage,
    IGSTAmount,
    grossAmount,
    ...rest
  } = {}) {
    super(rest),
      this.id = id;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.modifiedAt = modifiedAt;
    this.modifiedBy = modifiedBy;
    this.description = description;
    this.quantity = quantity;
    this.rate = rate;
    this.amount = amount;
    this.billsTransactionId = billsTransactionId;
    this.itemMasterId = itemMasterId;
    this.itemUnitMasterId = itemUnitMasterId;

    this.otherPercentage = otherPercentage;
    this.otherAmount = otherAmount;
    this.SGSTPercentage = SGSTPercentage;
    this.SGSTAmount = SGSTAmount;
    this.CGSTPercentage = CGSTPercentage;
    this.CGSTAmount = CGSTAmount;
    this.IGSTPercentage = IGSTPercentage;
    this.IGSTAmount = IGSTAmount;
    this.grossAmount = grossAmount;

  }
}
module.exports = {
  BillsDetail: BillsDetail
};
