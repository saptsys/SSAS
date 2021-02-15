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
  async update(entity , checkForUniqueCode = false) {
    const entityToUpdate = new this.ModelClass(entity)
    if(checkForUniqueCode){
      if (await this.existsByCode(entityToUpdate.code, entityToUpdate.id)) {
        return Promise.reject({ message: "code already exists" });
      }
    }
    return this.repository.update(entityToUpdate);
  }
  /**
   *
   * @returns  Promise
   */
  async save(entity, checkForUniqueCode = false) {
    const entityToSave = new this.ModelClass(entity)
    if(checkForUniqueCode){
      if (await this.existsByCode(entityToSave.code, entityToSave.id)) {
        return Promise.reject({ message: "code already exists" });
      }
    }
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
  
  /**
   *
   * @param {String} code
   * @param {Number} id
   * @returns Boolean
   */
  async existsByCode(code, id = null) {
    try {
      const stmt = this.repository
        .createQueryBuilder()
        .where("code = :code", { code: code });
      if (id) {
        stmt.andWhere("id != :id", { id: id });
      }
      stmt.select("count(id)", "total");
      let { total } = await stmt.getRawOne();
      if (total == 0) {
        return false;
      }
      return true;
    } catch (e) {
      return true;
    }
  }
}

module.exports = __BaseService;
