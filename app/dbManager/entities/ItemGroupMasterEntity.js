const EntitySchema = require("typeorm").EntitySchema;
const __BaseEntity = require("./__BaseEntity");

const NAME = "ItemGroupMaster";
const TABLE_NAME = "item_group_mst";
const {ItemGroupMaster} = require(`../models/ItemGroupMaster`)

module.exports = new EntitySchema({
  name: NAME,
  tableName: TABLE_NAME,
  target: ItemGroupMaster,
  columns: {
    ...__BaseEntity,
    name: {
      name: "name",
      type: "text",
      nullable: false,
    },
    code: {
      name: "code",
      type: "text",
      nullable: false,
      unique: true
    },
    isActive: {
      name: "is_active",
      type: "boolean",
      default: true,
    },
    system: {
      name: "system",
      type: "boolean",
      default: false,
    },
  },
  relations: {
    items: {
      target: "ItemMaster",
      joinColumn: {
        name: "id",
        referencedColumnName: 'itemGroupMaster'
      },
      inverseSide: 'itemGroupMaster',
      type: "one-to-many",
    }
  }
});
