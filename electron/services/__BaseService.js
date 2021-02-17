const { getConnection, Not } = require("typeorm");

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
  create(entity, withInique = [], uniqueRejectMessage = null) {
    const entityToCreate = new this.ModelClass(entity);
    return this.withUniqueChecking(
      entityToCreate,
      withInique,
      uniqueRejectMessage
    ).then(() => this.repository.create(entityToCreate));
  }
  /**
   *
   * @returns  Promise
   */
  async update(entity, withInique = [], uniqueRejectMessage = null) {
    const entityToUpdate = new this.ModelClass(entity);
    return this.withUniqueChecking(
      entityToUpdate,
      withInique,
      uniqueRejectMessage
    ).then(() => this.repository.update(entityToUpdate));
  }
  /**
   *
   * @returns  Promise
   */
  async save(entity, withInique = [], uniqueRejectMessage = null) {
    const entityToSave = new this.ModelClass(entity);
    return this.withUniqueChecking(
      entityToSave,
      withInique,
      uniqueRejectMessage
    ).then(() => this.repository.save(entityToSave));
  }
  /**
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

  withUniqueChecking(entity, withUnique, uniqueRejectMessage) {
    if (withUnique.length) {
      let condition = {};
      withUnique.forEach((col) => (condition[col] = entity[col]));

      return this.doCheckUnique({
        field: col,
        value: entity[col],
        uniqueRejectMessage: uniqueRejectMessage,
      });
    }
  }

  /**
   *
   * @param {Object} condition
   * @param {Number} id
   */
  doCheckUnique({ field, value, id, uniqueRejectMessage }) {
    let condition = { [field]: value };
    return this.repository
      .findOne({ ...condition, id: Not(id ?? 0) })
      .then((res) => {
        if (res) {
          return Promise.reject({
            message:
              uniqueRejectMessage ??
              Object.keys(condition)
                .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
                .join(", ") + " already exist",
          });
        } else {
          return Promise.resolve(true);
        }
      })
      .catch((err) => Promise.reject(err));
  }
}

module.exports = __BaseService;
