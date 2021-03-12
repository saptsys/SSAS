class _BaseModel {
  constructor({
    id,
    createdAt,
    createdBy,
    modifiedAt,
    modifiedBy,
    deletedAt
  } = {}
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.modifiedAt = modifiedAt;
    this.modifiedBy = modifiedBy;
    this.deletedAt = deletedAt;
  }
}

module.exports = { _BaseModel: _BaseModel }
