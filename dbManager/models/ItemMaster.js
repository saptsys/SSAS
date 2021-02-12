const _BaseModel = require("./_BaseModel");

class ItemMaster extends _BaseModel {
  constructor({
    id,
    createdAt,
    createdBy,
    modifiedAt,
    modifiedBy,
    name,
    code,
    description,
    date,
    salePrice,
    purchasePrice,
    itemTaxable,
    HSNCode,
    VATRate,
    AdditionalTax,
    isActive,
    system,
    itemUnitMaster,
    itemGroupMaster,
    taxMaster,
    ...rest

  } = {}) {
    super(rest)

    this.id = id;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.modifiedAt = modifiedAt;
    this.modifiedBy = modifiedBy;
    this.name = name;
    this.code = code;
    this.description = description;
    this.date = date;
    this.salePrice = salePrice;
    this.purchasePrice = purchasePrice;
    this.itemTaxable = itemTaxable;
    this.HSNCode = HSNCode;
    this.VATRate = VATRate;
    this.AdditionalTax = AdditionalTax;
    this.isActive = isActive;
    this.system = system;
    this.itemGroupMaster = itemGroupMaster;
    this.itemUnitMaster = itemUnitMaster;
    this.taxMaster = taxMaster;
  }
}
module.exports = ItemMaster;