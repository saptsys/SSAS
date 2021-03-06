import _BaseModel from "./_BaseModel";

class TaxMaster extends _BaseModel {
  constructor({
    id,
    createdAt,
    createdBy,
    modifiedAt,
    modifiedBy,
    name,
    code,
    description,
    isActive,
    system,
    taxPercentage,
    ...rest
  } = {}) {
    super(rest), (this.id = id);
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.modifiedAt = modifiedAt;
    this.modifiedBy = modifiedBy;
    this.name = name;
    this.code = code;
    this.description = description;
    this.isActive = isActive;
    this.system = system;
    this.taxPercentage = taxPercentage;
  }
}
export default TaxMaster;
