const {_BaseModel} = require("./_BaseModel");

class BillsTransaction extends _BaseModel {
  constructor({
    id,
    createdAt,
    createdBy,
    modifiedAt,
    modifiedBy,
    tag,
    billing,
    billNumber,
    billDate,
    voucherNumber,
    challanNumber,
    chalanDate,
    dueDate,
    grossAmount,
    discountPercentage,
    discountAmount,
    SGSTPercentage,
    SGSTAmount,
    CGSTPercentage,
    CGSTAmount,
    IGSTPercentage,
    IGSTAmount,
    ferightPercentage,
    freightAmount,
    commisionPercentage,
    commisionAmount,
    otherAmount,
    netAmount,
    remarks,
    partyMasterId,
    billsDetail,
    ...rest
  } = {}) {
    super(rest), (this.id = id);
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.modifiedAt = modifiedAt;
    this.modifiedBy = modifiedBy;
    this.tag = tag;
    this.billing = billing;
    this.billNumber = billNumber;
    this.billDate = billDate;
    this.voucherNumber = voucherNumber;
    this.challanNumber = challanNumber;
    this.chalanDate = chalanDate;
    this.dueDate = dueDate;
    this.grossAmount = grossAmount;
    this.discountPercentage = discountPercentage;
    this.discountAmount = discountAmount;
    this.SGSTPercentage = SGSTPercentage;
    this.SGSTAmount = SGSTAmount;
    this.CGSTPercentage = CGSTPercentage;
    this.CGSTAmount = CGSTAmount;
    this.IGSTPercentage = IGSTPercentage;
    this.IGSTAmount = IGSTAmount;
    this.ferightPercentage = ferightPercentage;
    this.freightAmount = freightAmount;
    this.commisionPercentage = commisionPercentage;
    this.commisionAmount = commisionAmount;
    this.otherAmount = otherAmount;
    this.netAmount = netAmount;
    this.remarks = remarks;
    this.partyMasterId = partyMasterId;
    this.billsDetail = billsDetail;
  }
}
module.exports = {
  BillsTransaction: BillsTransaction
};
