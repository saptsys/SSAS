const _BaseModel = require("./_BaseModel");

class SettingsMaster extends _BaseModel {
  constructor({
    id,
    createdAt,
    createdBy,
    modifiedAt,
    modifiedBy,
    key,
    type,
    options,
    description,
    defaultValue,
    currentValue,
    system,
    ...rest
  } = {}) {
    super(rest), (this.id = id);
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.modifiedAt = modifiedAt;
    this.modifiedBy = modifiedBy;
    this.key = key;
    this.type = type;
    this.options = options;
    this.description = description;
    this.defaultValue = defaultValue;
    this.currentValue = currentValue;
    this.system = system;
  }
}
module.exports = SettingsMaster;
