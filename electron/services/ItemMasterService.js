const __BaseService = require("./__BaseService");
const Models = require("../../dbManager/models/index");
const { getConnection, Repository } = require("typeorm");
class ItemMasterService extends __BaseService {
  constructor() {
    super(Models.ItemMaster);
    /**
     * @instance Repository
     */
    this.repository = getConnection().getRepository(Models.ItemMaster);
  }
  // overriding to send extra fields
  getAll() {
    const stmt = this.repository
      .createQueryBuilder("item")
      .leftJoin("item.itemUnitMaster", "units")
      .leftJoin("item.itemGroupMaster", "groups")
      .leftJoin("item.taxMaster", "taxes")

      .select([
        "item.*",
        "units.name as itemUnitMasterName",
        "groups.name as itemGroupMasterName",
        "taxes.name as taxMasterName",
      ]);
    return stmt.getRawMany();
  }

  /**
   *
   * @returns  Promise
   */
  async save(entity) {
    const entityToSave = new this.ModelClass(entity);
    if (await this.existsByCode(entityToSave.code, entityToSave.id)) {
      return Promise.reject({ message: "item code already exists" });
    }
    return this.repository.save(entityToSave);
  }

  /**
   *
   * @returns  Promise
   */
  async update(entity) {
    if (await this.existsByCode(entity.code, entity.id)) {
      return Promise.reject({ message: "item code already exists" });
    }
    const entityToUpdate = new this.ModelClass(entity);
    return this.repository.update(entityToUpdate);
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
        .createQueryBuilder("item")
        .where("item.code = :code", { code: code });
      if (id) {
        stmt.andWhere("item.id != :id", { id: id });
      }
      stmt.select("count(item.id)", "total");
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
module.exports = ItemMasterService;
