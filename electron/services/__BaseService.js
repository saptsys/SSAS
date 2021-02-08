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
    return this.repository.create(entity);
  }
  /**
   *
   * @returns  Promise
   */
  update(entity) {
    return this.repository.update(entity);
  }
  /**
   *
   * @returns  Promise
   */
  save(entity) {
    return this.repository.save(entity);
  }
  /**
   *
   * @returns  Promise
   */
  delete(id) {
    return this.repository.softDelete(id);
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
