import _BaseModel from "./_BaseModel";

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
    salePrice,
    purchasePrice,
    itemTaxable,
    HSNCode,
    VATRate,
    additionalTax,
    isActive,
    system,
    itemUnitMasterId,
    itemGroupMasterId,
    taxMasterId,
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
    this.salePrice = salePrice;
    this.purchasePrice = purchasePrice;
    this.itemTaxable = itemTaxable;
    this.HSNCode = HSNCode;
    this.VATRate = VATRate;
    this.additionalTax = additionalTax;
    this.isActive = isActive;
    this.system = system;
    this.itemGroupMasterId = itemGroupMasterId;
    this.itemUnitMasterId = itemUnitMasterId;
    this.taxMasterId = taxMasterId;
  }
}
export default ItemMaster;
