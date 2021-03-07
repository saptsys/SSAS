const {_BaseModel} = require("./_BaseModel");

class ItemGroupMaster extends _BaseModel {
  constructor({
    id,
    createdAt,
    createdBy,
    modifiedAt,
    modifiedBy,
    name,
    code,
    isActive,
    system,
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
    this.isActive = isActive;
    this.system = system;
  }
}
module.exports = {ItemGroupMaster:ItemGroupMaster};
