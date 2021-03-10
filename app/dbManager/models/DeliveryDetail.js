const {_BaseModel} = require("./_BaseModel");

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
    deliveryTransactionId,
    itemMasterId,
    itemUnitMasterId,
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
    this.deliveryTransactionId = deliveryTransactionId;
    this.itemMasterId = itemMasterId;
    this.itemUnitMasterId = itemUnitMasterId;
  }
}
module.exports = {DeliveryDetail:DeliveryDetail};
