const __BaseService = require("./__BaseService");
const Models = require("../../dbManager/models/index");
const { getConnection, Repository } = require("typeorm");
class ItemMasterService extends __BaseService {
  constructor() {
    super(Models.ItemMaster);
    /**
     * @instance Repository
     */
  }
  // overriding to send extra fields
  getAll() {
    const stmt = this.repository
      .createQueryBuilder("item")
      .leftJoinAndSelect("item.itemUnitMaster", "units")
      .leftJoinAndSelect("item.itemGroupMaster", "groups")
      .leftJoinAndSelect("item.taxMaster", "taxes")

    return stmt.getMany().then(res => {
      return res.map(x => {
        return {
          ...x,
          itemGroupMaster: {
            name: x.itemGroupMaster?.name,
            id: x.itemGroupMaster?.id
          },
          itemUnitMaster: {
            name: x.itemUnitMaster?.name,
            id: x.itemUnitMaster?.id
          },
          taxMaster: {
            name: x.taxMaster?.name,
            id: x.taxMaster?.id
          }
        }
      })
    })
  }

  save(entity) {
    return super.save(entity, ["code"]);
  }
}
module.exports = ItemMasterService;
