const { getConnection } = require("typeorm");

class __BaseService {
  /**
   * @param {_BaseModel} model
   */
  constructor(model) {
    this.ModelClass = model;
    this.repository = getConnection().getRepository(model);
  }
  /**
   *
   * @returns  Promise
   */
  getAll() {
    return this.repository.find();
  }
  /**
   *
   * @returns  Promise
   */
  getById(id) {
    return this.repository.findOne(id);
  }
  /**
   *
   * @returns  Promise
   */
  create(entity) {
    const entityToCreate = new this.ModelClass(entity)
    return this.repository.create(entityToCreate);
  }
  /**
   *
   * @returns  Promise
   */
  update(entity) {
    const entityToUpdate = new this.ModelClass(entity)
    return this.repository.update(entityToUpdate);
  }
  /**
   *
   * @returns  Promise
   */
  save(entity) {
    const entityToSave = new this.ModelClass(entity)
    return this.repository.save(entityToSave);
  }
  /**
   *
   * @returns  Promise
   */
  delete(id) {
    return this.repository.softDelete(id)
  }
  /**
   *
   * @returns  Promise
   */
  deleteHard(id) {
    return this.repository.delete(id);
  }
}

module.exports = __BaseService;
