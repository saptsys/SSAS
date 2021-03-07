class _BaseModel {
    constructor({
        id,
        createdAt,
        createdBy,
        modifiedAt,
        modifiedBy,
    } = {}
    ) {
        this.id = id;
        this.createdAt = createdAt;
        this.createdBy = createdBy;
        this.modifiedAt = modifiedAt;
        this.modifiedBy = modifiedBy;
    }
}

module.exports ={_BaseModel:_BaseModel}
