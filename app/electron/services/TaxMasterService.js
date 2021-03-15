
const __BaseService = require("./__BaseService");
const { TaxMaster } = require("../../dbManager/models/TaxMaster");
const rowToModelPropertyMapper = require("../../dbManager/dbUtils");
const { Not } = require("typeorm");

class TaxMasterService extends __BaseService {
  constructor() {
    super(TaxMaster)
  }

  /**
   *
   * @returns  Promise
   */
  getAll() {
    const query = this.repository.createQueryBuilder('tax');
    query.leftJoin("ItemMaster", "items", "tax.id = items.taxMaster AND (items.isActive = true AND items.deleted_at IS NULL)")
    query.select([
      ...rowToModelPropertyMapper("tax", TaxMaster),
      "count(items.id) as containsItems"
    ]).groupBy("tax.id")
    return query.getRawMany();
  }

  save(entity) {
    return new Promise(async (reso, reje) => {
      try {
        console.log("Is Active => ", entity)
        if (entity.isActive) {
          super.save(entity, ["code"]).then(async (res) => {
            await this.repository.update({ id: Not(res.id ?? 0) }, { isActive: false })
            reso(res)
          }).catch(reje)
        } else {
          const activeTax = await this.getActiveTax()
          if (activeTax && activeTax.id !== entityForEdit.id)
            reso(reso)
          else
            reje({ message: "There should be atleast one tax active." })
        }
      } catch (error) {
        reje(error)
      }
    })
  }

  delete(id) {
    return this.hasItems(id).then(contains => {
      if (contains.items) {
        return Promise.reject({ message: "This Tax Contains items so can't be deleted!" });
      } else {
        return super.delete(id);
      }
    })
  }

  /**
   *
   * @param {Integer} id
   * @returns {Promise}
   */
  hasItems(id) {
    const stmt = this.connection.manager.createQueryBuilder(ItemMaster, "item")
      .where("item.isActive = true")
      .andWhere("item.deletedAt IS NULL")
      .andWhere("item.taxMasterId = :id", { id: id })
      .select("count(item.id) as items");
    return stmt.getRawOne();
  }


  getActiveTax() {
    return this.repository.findOne({ where: { isActive: true, deletedAt: null } })
  }

}
module.exports = TaxMasterService;
