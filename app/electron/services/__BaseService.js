const { getConnection, Not } = require("typeorm");

class __BaseService {
  /**
   * @param {_BaseModel} model
   */
  constructor(model) {
    this.ModelClass = model;
    this.connection = getConnection();
    this.repository = this.connection.getRepository(model);
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
    return this.repository.findOneOrFail(id)
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
    return getConnection().transaction((entityManager) => {
      const localRepo = entityManager.getRepository(this.ModelClass);
      if (localRepo) {
        return localRepo.findOne(id).then((entityToDelete) => {
          localRepo.metadata.ownUniques.forEach((uniqCol) => {
            uniqCol.columns
              .filter((col) => col.type === "text")
              .forEach((col) => {
                entityToDelete[col.propertyName] =
                  entityToDelete[col.propertyName] + "__del_" + id;
              });
          });
          return entityManager
            .update(this.ModelClass, id, entityToDelete)
            .then(() => entityManager.softDelete(this.ModelClass, id));
        });
      } else {
        return Promise.reject({ message: "Something went wrong repository not found." });
      }
    });
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
        fields: condition,
        id: entity.id,
        uniqueRejectMessage: uniqueRejectMessage,
      });
    } else return Promise.resolve(true);
  }

  /**
   *
   * @param {Object} condition
   * @param {Number} id
   */
  doCheckUnique({ fields, id, uniqueRejectMessage }) {
    console.log(fields, id);
    return this.repository
      .findOne({ ...fields, id: Not(id ?? 0) })
      .then((res) => {
        if (res) {
          return Promise.reject({
            message:
              uniqueRejectMessage ??
              Object.keys(fields)
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
