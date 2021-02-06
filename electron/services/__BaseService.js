const { getConnection } = require('typeorm')

class __BaseService {

    /**
     * @param {_BaseModel} model
     */
    constructor(model) {
        this.ModelClass = model
        this.repository = getConnection().getRepository(model)
    }

    getAll() {
        return this.repository.find()
    }
    getById(id) {
        return this.repository.findOne(id)
    }
    create(entity) {
        return this.repository.create(entity)
    }
    update(entity) {
        return this.repository.update(entity)
    }
    save(entity) {
        return this.repository.save(entity)
    }
    delete(id) {
        return this.repository.softDelete(id)
    }
    deleteHard(id) {
        return this.repository.delete(id)
    }
}

module.exports = __BaseService