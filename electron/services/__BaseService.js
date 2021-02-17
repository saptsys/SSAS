const { message } = require("antd");
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
  update(entity, withInique = [], uniqueRejectMessage = null) {
    const entityToUpdate = new this.ModelClass(entity);
    return this.withUniqueChecking(
      entityToUpdate,
      withInique,
      uniqueRejectMessage
    ).then(() => this.repository.update(entityToUpdate.id, entityToUpdate));
  }
  /**
   *
   * @returns  Promise
   */
  save(entity, withInique = [], uniqueRejectMessage = null) {
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
    // return this.repository.softDelete(id);
    return getConnection().transaction(entityManager => {
      const localRepo = entityManager.getRepository(this.ModelClass)
      if (localRepo) {
        return localRepo.findOne(id).then(entityToDelete => {
          localRepo.metadata.ownUniques.forEach(uniqCol => {
            uniqCol.columns.filter(col => col.type === "text").forEach(col => {
              entityToDelete[col.propertyName] = entityToDelete[col.propertyName] + "__del_" + id
            })
          })
          return entityManager.update(this.ModelClass, id, entityToDelete).then(() => {
            return entityManager.softDelete(this.ModelClass, id).then(res => res.affected ? Promise.resolve(res) : Promise.reject({ message: "Something went wrong record(s) not deleted" }))
          })
        })

      } else {
        return Promise.reject({ message: "Something went wrong repository not found." })
      }
    })
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
      return this.repository
        .findOne({ ...condition, id: Not(entity.id ?? 0) })
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
    } else
      return Promise.resolve(true)
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
