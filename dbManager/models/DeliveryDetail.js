const _BaseModel = require("./_BaseModel");

class DeliveryDetail extends _BaseModel {
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
    deliveryTransaction,
    itemMaster,
    unitMaster,
    ...rest
  } = {}) {
    super(rest), (this.id = id);
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.modifiedAt = modifiedAt;
    this.modifiedBy = modifiedBy;
    this.description = description;
    this.quantity = quantity;
    this.rate = rate;
    this.amount = amount;
    this.deliveryTransaction = deliveryTransaction;
    this.itemMaster = itemMaster;
    this.unitMaster = unitMaster;
  }
}
module.exports = DeliveryDetail;
